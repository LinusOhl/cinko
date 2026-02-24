import { queryOptions } from "@tanstack/react-query";
import {
  fetchMovieFn,
  fetchPlayingMoviesFn,
  fetchPopularMoviesFn,
  fetchTopMoviesFn,
  fetchUpcomingMoviesFn,
} from "~/server/tmdb/movies";

export const movieQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieFn({ data: { id } }),
  });

export const popularMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["popular-movies"],
    queryFn: () => fetchPopularMoviesFn(),
  });

export const topMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["top-movies"],
    queryFn: () => fetchTopMoviesFn(),
  });

export const playingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["playing-movies"],
    queryFn: () => fetchPlayingMoviesFn(),
  });

export const upcomingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["upcoming-movies"],
    queryFn: () => fetchUpcomingMoviesFn(),
  });
