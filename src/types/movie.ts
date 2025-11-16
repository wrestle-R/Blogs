export interface Movie {
  id: string;
  tmdbId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  overview: string;
  suggestedBy: string;
  createdAt: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export interface TMDBSearchResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}
