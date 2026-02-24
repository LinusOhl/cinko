import { queryOptions } from "@tanstack/react-query";
import { fetchMovieGenresFn, fetchTVGenresFn } from "~/server/tmdb/genres";

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
