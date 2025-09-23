import { apiFetch } from "../lib/api";
import type {
  MovieDetails,
  MovieListResponse,
  NowPlayingMoviesResponse,
} from "../types/movies.types";

export const fetchPopularMovies = async (): Promise<MovieListResponse> => {
  return await apiFetch<MovieListResponse>("/movies/popular", {
    method: "GET",
  });
};

export const fetchTopRatedMovies = async (): Promise<MovieListResponse> => {
  return await apiFetch<MovieListResponse>("/movies/top_rated", {
    method: "GET",
  });
};

export const fetchNowPlayingMovies =
  async (): Promise<NowPlayingMoviesResponse> => {
    return await apiFetch<NowPlayingMoviesResponse>("/movies/now_playing", {
      method: "GET",
    });
  };

export const fetchMovieById = async (
  movieId: number,
): Promise<MovieDetails> => {
  return await apiFetch<MovieDetails>(
    `/movies/${movieId}/details?append_to_response=credits,images,similar,videos`,
    {
      method: "GET",
    },
  );
};
