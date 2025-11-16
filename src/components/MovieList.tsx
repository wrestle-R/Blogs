import { useState, useEffect } from 'react';
import { getMovies, addMovie, deleteMovie } from '@/lib/movies-db';
import { getMoviePosterUrl } from '@/lib/tmdb';
import MovieSuggestionDialog from './MovieSuggestionDialog';
import { Button } from './ui/button';
import type { Movie } from '@/types/movie';
import type { TMDBMovie } from '@/types/movie';

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = async (tmdbMovie: TMDBMovie) => {
    const optimisticMovie: Movie = {
      id: `temp-${Date.now()}`,
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      posterPath: tmdbMovie.poster_path,
      releaseDate: tmdbMovie.release_date,
      overview: tmdbMovie.overview,
      suggestedBy: 'Anonymous',
      createdAt: Date.now(),
    };

    setMovies((prev) => [optimisticMovie, ...prev]);

    try {
      const newMovie = await addMovie({
        tmdbId: tmdbMovie.id,
        title: tmdbMovie.title,
        posterPath: tmdbMovie.poster_path,
        releaseDate: tmdbMovie.release_date,
        overview: tmdbMovie.overview,
        suggestedBy: 'Anonymous',
      });

      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === optimisticMovie.id ? newMovie : movie
        )
      );
    } catch (error) {
      console.error('Error adding movie:', error);
      setMovies((prev) => prev.filter((movie) => movie.id !== optimisticMovie.id));
    }
  };

  const handleDeleteMovie = async (movieId: string) => {
    setDeletingIds((prev) => new Set(prev).add(movieId));

    const previousMovies = [...movies];
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));

    try {
      await deleteMovie(movieId);
    } catch (error) {
      console.error('Error deleting movie:', error);
      setMovies(previousMovies);
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Movie Suggestions</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in the list
          </p>
        </div>
        <MovieSuggestionDialog onMovieSelect={handleMovieSelect}>
          <Button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Movie
          </Button>
        </MovieSuggestionDialog>
      </div>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-muted/30">
          <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <p className="text-muted-foreground text-lg font-medium">No movies yet</p>
          <p className="text-muted-foreground text-sm mt-1">Click "Add Movie" to suggest one</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`group relative rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg ${
                deletingIds.has(movie.id) ? 'opacity-50 pointer-events-none' : ''
              } ${movie.id.startsWith('temp-') ? 'animate-pulse' : ''}`}
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                {movie.posterPath ? (
                  <img
                    src={getMoviePosterUrl(movie.posterPath, 'w342') || ''}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg line-clamp-2">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                    </p>
                  </div>
                  {!movie.id.startsWith('temp-') && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMovie(movie.id)}
                      disabled={deletingIds.has(movie.id)}
                      className="shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
