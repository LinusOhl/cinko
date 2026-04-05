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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const popularMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["popular-movies"],
    queryFn: () => fetchPopularMoviesFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const topMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["top-movies"],
    queryFn: () => fetchTopMoviesFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const playingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["playing-movies"],
    queryFn: () => fetchPlayingMoviesFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const upcomingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["upcoming-movies"],
    queryFn: () => fetchUpcomingMoviesFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
