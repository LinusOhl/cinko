import { queryOptions } from "@tanstack/react-query";
import {
  fetchMovieById,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../services/movie.service";

export const nowPlayingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => fetchNowPlayingMovies(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

export const popularMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["popularMovies"],
    queryFn: () => fetchPopularMovies(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

export const topRatedMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["topRatedMovies"],
    queryFn: () => fetchTopRatedMovies(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

export const movieQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
