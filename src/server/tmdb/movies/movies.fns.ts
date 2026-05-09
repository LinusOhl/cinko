import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import type {
  TMDBMovieDetails,
  TMDBPlayingMovies,
  TMDBPopularMovies,
  TMDBTopMovies,
  TMDBUpcomingMovies,
} from "~/types/tmdb";
import { tmdbFetch } from "../client";

export const fetchMovieFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      id: z.string(),
      appendToResponse: z.array(z.string()).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, appendToResponse } = data;

    const searchParams = appendToResponse?.length
      ? `?append_to_response=${appendToResponse?.join(",")}`
      : "";

    return tmdbFetch<TMDBMovieDetails>(`/movie/${id}${searchParams}`);
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
    return tmdbFetch<TMDBPlayingMovies>("/movie/now_playing?region=US");
  },
);

export const fetchUpcomingMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return tmdbFetch<TMDBUpcomingMovies>("/movie/upcoming");
  },
);
