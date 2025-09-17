import type { MovieListResponse } from "../types/movies.types";

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<MovieListResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/search/movies?query=${query}&page=${page}`;

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
