type TMDBBaseList<T> = {
  page: number;
  results: T[];
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

type ProductionCountry = {
  name: string;
  iso_3166_1: string;
};

type SpokenLanguage = {
  name: string;
  english_name: string;
  iso_639_1: string;
};

type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

type Credits = {
  cast: Cast[];
  crew: Crew[];
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
  credits: Credits;
};

export type TMDBMovieDetails = Omit<TMDBMovie, "genre_ids"> & {
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
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
