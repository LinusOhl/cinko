type TMDBBaseList<T> = {
  page: number;
  results: T[];
};

export type TMDBMovie = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMDBPlayingMovies = TMDBBaseList<TMDBMovie> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

export type TMDBPopularMovies = TMDBBaseList<TMDBMovie>;

export type TMDBTopMovies = TMDBBaseList<TMDBMovie>;

export type TMDBUpcomingMovies = TMDBBaseList<TMDBMovie> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};
