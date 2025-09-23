import { apiFetch } from "../lib/api";
import type { MovieListResponse } from "../types/movies.types";

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<MovieListResponse> => {
  return await apiFetch<MovieListResponse>(
    `/search/movies?query=${query}&page=${page}`,
    {
      method: "GET",
    },
  );
};
