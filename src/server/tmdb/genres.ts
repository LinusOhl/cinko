import { createServerFn } from "@tanstack/react-start";
import { tmdbFetch } from "./client";

export const fetchMovieGenresFn = createServerFn({ method: "GET" }).handler(
  async () => {
    tmdbFetch("/genre/movie/list");
  },
);

export const fetchTVGenresFn = createServerFn({ method: "GET" }).handler(
  async () => {
    tmdbFetch("/genre/tv/list");
  },
);
