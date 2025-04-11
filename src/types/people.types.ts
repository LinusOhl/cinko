import type { CastCredit, CrewCredit, MovieCredits } from "./movies.types";

type Picture = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  width: number;
};

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
  movie_credits?: MovieCredits;
};
