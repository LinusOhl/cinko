import type { MovieListResponse } from "../types/movies.types";

export const discoverMovies = async (
  page: number = 1,
  sortBy: string,
  pry?: string,
): Promise<MovieListResponse> => {
  let url = `${import.meta.env.VITE_API_URL}/discover/movies?page=${page}&sortBy=${sortBy}`;

  if (pry) {
    url = url.concat(`&pry=${pry}`);
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as MovieListResponse;
  } catch (error: unknown) {
    throw new Error(`Fetch failed: ${error}`);
  }
};
