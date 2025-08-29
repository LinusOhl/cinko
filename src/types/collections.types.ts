import type { Movie } from "./movies.types";

type MovieWithMediaType = Movie & {
  media_type: string;
};

export type Collection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: MovieWithMediaType[];
};
