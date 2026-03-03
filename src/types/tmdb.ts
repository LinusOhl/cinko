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

export type TMDBMovieDetails = Omit<TMDBMovie, "genre_ids"> & {
  belongs_to_collection: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
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
