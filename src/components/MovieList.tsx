import { useState, useEffect, useRef } from 'react';
import { getMovies, addMovie, deleteMovie } from '@/lib/movies-db';
import { getMoviePosterUrl, searchMovies } from '@/lib/tmdb';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { Movie } from '@/types/movie';
import type { TMDBMovie } from '@/types/movie';

interface MovieListProps {
  showSuggestions: boolean;
}

const MY_MOVIES_KEY = 'my-added-movies';

const getMyMovies = (): Set<string> => {
  try {
    const stored = localStorage.getItem(MY_MOVIES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const addMyMovie = (movieId: string) => {
  const myMovies = getMyMovies();
  myMovies.add(movieId);
  localStorage.setItem(MY_MOVIES_KEY, JSON.stringify([...myMovies]));
};

const removeMyMovie = (movieId: string) => {
  const myMovies = getMyMovies();
  myMovies.delete(movieId);
  localStorage.setItem(MY_MOVIES_KEY, JSON.stringify([...myMovies]));
};

export default function MovieList({ showSuggestions }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [myMovies, setMyMovies] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(showSuggestions);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load movies in background without showing loading state
    loadMovies();
    setMyMovies(getMyMovies());
  }, []);

  useEffect(() => {
    const handleToggle = (event: CustomEvent) => {
      setVisible(event.detail.show);
    };

    window.addEventListener('toggle-suggestions', handleToggle as EventListener);
    return () => {
      window.removeEventListener('toggle-suggestions', handleToggle as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const results = await searchMovies(searchQuery);
          setSearchResults(results.results.slice(0, 5));
        } catch (error) {
          console.error('Error searching movies:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const loadMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleMovieSelect = async (tmdbMovie: TMDBMovie) => {
    // Check if movie already exists
    const alreadyExists = movies.some(m => m.tmdbId === tmdbMovie.id);
    if (alreadyExists) {
      return;
    }

    setSearchQuery('');
    setSearchResults([]);

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

      addMyMovie(newMovie.id);
      setMyMovies(getMyMovies());

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
    if (!myMovies.has(movieId)) {
      return;
    }

    setDeletingIds((prev) => new Set(prev).add(movieId));

    const previousMovies = [...movies];
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));

    try {
      await deleteMovie(movieId);
      removeMyMovie(movieId);
      setMyMovies(getMyMovies());
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

  return (
    <div className="space-y-6">
      <div className="relative" ref={searchContainerRef}>
        <Input
          type="text"
          placeholder="Search for a movie to add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 border rounded-lg bg-background shadow-lg max-h-[400px] overflow-y-auto">
            {searchResults.map((movie) => {
              const isAdded = movies.some(m => m.tmdbId === movie.id);
              return (
                <div
                  key={movie.id}
                  className="w-full flex items-start gap-3 p-3 border-b last:border-b-0"
                >
                  {movie.poster_path ? (
                    <img
                      src={getMoviePosterUrl(movie.poster_path, 'w92') || ''}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-18 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="font-medium text-sm truncate">{movie.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {movie.overview}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleMovieSelect(movie)}
                    disabled={isAdded}
                    className="shrink-0"
                  >
                    {isAdded ? 'Added' : 'Add'}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!visible && movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/30">
          <svg className="w-12 h-12 text-muted-foreground/50 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <p className="text-muted-foreground font-medium">No movies yet</p>
          <p className="text-muted-foreground text-sm mt-1">Search above to add a movie</p>
        </div>
      ) : visible && (
        <div className="flex flex-col gap-3">
          {movies.map((movie) => {
            const canDelete = myMovies.has(movie.id);
            return (
              <div
                key={movie.id}
                className={`group flex gap-3 rounded-lg border bg-card p-3 transition-all hover:shadow-md ${
                  deletingIds.has(movie.id) ? 'opacity-50 pointer-events-none' : ''
                } ${movie.id.startsWith('temp-') ? 'animate-pulse' : ''}`}
              >
                <div className="relative w-20 h-28 shrink-0 overflow-hidden rounded bg-muted">
                  {movie.posterPath ? (
                    <img
                      src={getMoviePosterUrl(movie.posterPath, 'w154') || ''}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base leading-tight">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                      </p>
                    </div>
                    {!movie.id.startsWith('temp-') && canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMovie(movie.id)}
                        disabled={deletingIds.has(movie.id)}
                        className="shrink-0 h-8 w-8"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {movie.overview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
