import { queryOptions } from "@tanstack/react-query";
import {
  fetchMovieById,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../services/movies.services";

export const nowPlayingMoviesQueryOptions = queryOptions({
  queryKey: ["nowPlayingMovies"],
  queryFn: fetchNowPlayingMovies,
});

export const popularMoviesQueryOptions = queryOptions({
  queryKey: ["popularMovies"],
  queryFn: fetchPopularMovies,
});

export const topRatedMoviesQueryOptions = queryOptions({
  queryKey: ["topRatedMovies"],
  queryFn: fetchTopRatedMovies,
});

export const movieQueryOptions = (movieId: string) =>
  queryOptions({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId),
  });
