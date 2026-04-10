import { queryOptions } from "@tanstack/react-query";
import { fetchMovieGenresFn, fetchTVGenresFn } from "./genres.fns";

export const movieGenresQueryOptions = () =>
  queryOptions({
    queryKey: ["movie-genres"],
    queryFn: () => fetchMovieGenresFn(),
  });

export const tvGenresQueryOptions = () =>
  queryOptions({
    queryKey: ["tv-genres"],
    queryFn: () => fetchTVGenresFn(),
  });
