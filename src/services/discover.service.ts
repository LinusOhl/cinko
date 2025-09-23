import { apiFetch } from "../lib/api";
import type { MovieListResponse } from "../types/movies.types";

export const discoverMovies = async (
  page: number = 1,
  sortBy: string,
  pry?: string,
): Promise<MovieListResponse> => {
  let url = `/discover/movies?page=${page}&sortBy=${sortBy}`;

  if (pry) {
    url = url.concat(`&pry=${pry}`);
  }

  return await apiFetch<MovieListResponse>(url, {
    method: "GET",
  });
};
