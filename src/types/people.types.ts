type Picture = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  width: number;
};

type MovieCastCredit = {
  id: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  character: string
  credit_id: string
  order: number
}

type MovieCrewCredit = {
  id: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  credit_id: string
  department: string
  job: string
}

export type Person = {
  id: number;
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images?: {
    profiles: Picture[];
  };
  movie_credits?: {
    cast: MovieCastCredit[];
    crew: MovieCrewCredit[];
  };
};
