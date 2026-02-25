import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import type {
  TMDBMovie,
  TMDBPlayingMovies,
  TMDBPopularMovies,
  TMDBTopMovies,
  TMDBUpcomingMovies,
} from "~/types/tmdb";
import { tmdbFetch } from "./client";

export const fetchMovieFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBMovie>(`/movie/${data.id}`);
  });

export const fetchPopularMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return tmdbFetch<TMDBPopularMovies>("/movie/popular");
  },
);

export const fetchTopMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return tmdbFetch<TMDBTopMovies>("/movie/top_rated");
  },
);

export const fetchPlayingMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return tmdbFetch<TMDBPlayingMovies>("/movie/now_playing");
  },
);

export const fetchUpcomingMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return tmdbFetch<TMDBUpcomingMovies>("/movie/upcoming");
  },
);
