import type { Genre } from "./genres.types";

// Utility types
type PaginatedResult<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

// Production details
type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type Language = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type AlternativeTitle = {
  iso_3166_1: string;
  title: string;
  type: string;
};

type ReleaseDate = {
  iso_3166_1: string;
  release_dates: ReleaseDateDetails[];
};

type ReleaseDateDetails = {
  certification: string;
  descriptors: [];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

type Image = {
  aspect_ratio: number;
  height: number;
  width: number;
  iso_639_1: string | null;
  file_path: string;
};

type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

// Credits
export type BaseCredit = Movie & {
  credit_id: string;
  known_for_department: string;
  name: string;
};

export type CastCredit = {
  id: number;
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CrewCredit = {
  id: number;
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieCredits = {
  cast: CastCredit[];
  crew: CrewCredit[];
};

// Movie types
export type Movie = {
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
};

export type MovieDetails = Movie & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  credits?: {
    cast?: CastCredit[];
    crew?: CrewCredit[];
  };
  alternative_titles?: {
    titles: AlternativeTitle[];
  };
  images?: {
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
  };
  release_dates?: {
    results: ReleaseDate[];
  };
  similar?: MovieListResponse;
  videos?: {
    results: Video[];
  };
};

export type MovieListResponse = PaginatedResult<Movie>;

export type NowPlayingMoviesResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
