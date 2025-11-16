import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { searchMovies, getMoviePosterUrl } from '@/lib/tmdb';
import type { TMDBMovie } from '@/types/movie';

interface MovieSuggestionDialogProps {
  onMovieSelect: (movie: TMDBMovie) => void;
  children: React.ReactNode;
}

export default function MovieSuggestionDialog({ onMovieSelect, children }: MovieSuggestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMovie) {
      onMovieSelect(selectedMovie);
      setOpen(false);
      setSearchQuery('');
      setSelectedMovie(null);
      setSearchResults([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Suggest a Movie</DialogTitle>
          <DialogDescription>
            Search for a movie and add it to the list
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="movie" className="text-sm font-medium">
              Search Movie
            </label>
            <Input
              id="movie"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>

          {isSearching && (
            <div className="text-sm text-muted-foreground text-center py-4">
              Searching...
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-2">
              {searchResults.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => {
                    setSelectedMovie(movie);
                    setSearchQuery(movie.title);
                    setSearchResults([]);
                  }}
                  className={`w-full flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors ${
                    selectedMovie?.id === movie.id ? 'bg-muted' : ''
                  }`}
                >
                  {movie.poster_path ? (
                    <img
                      src={getMoviePosterUrl(movie.poster_path, 'w92') || ''}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-18 bg-muted rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-sm">{movie.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {movie.overview}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedMovie}
            >
              Add Movie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
