import type { TMDBSearchResponse } from '@/types/movie';

const TMDB_API_KEY = import.meta.env.PUBLIC_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = import.meta.env.PUBLIC_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query: string): Promise<TMDBSearchResponse> => {
  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  if (!TMDB_ACCESS_TOKEN) {
    console.error('TMDB_ACCESS_TOKEN is not defined. Please check your .env file.');
    throw new Error('TMDB API token is not configured');
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    console.error('TMDB API Error:', response.status, response.statusText);
    throw new Error('Failed to search movies');
  }

  return response.json();
};

export const getMoviePosterUrl = (posterPath: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342'): string | null => {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};
