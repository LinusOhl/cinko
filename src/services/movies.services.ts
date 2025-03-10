import type {
  Movie,
  MovieDetails,
  MovieListResponse,
  NowPlayingMoviesResponse,
} from "../types/movies.types";

export const fetchPopularMovies =
  async (): Promise<MovieListResponse | null> => {
    const url = `${import.meta.env.VITE_API_URL}/movies/popular`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        return null;
      }

      return (await response.json()) as MovieListResponse;
    } catch (error: unknown) {
      console.error(`Fetch failed: ${error}`);
      return null;
    }
  };

export const fetchTopRatedMovies =
  async (): Promise<MovieListResponse | null> => {
    const url = `${import.meta.env.VITE_API_URL}/movies/top_rated`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        return null;
      }

      return (await response.json()) as MovieListResponse;
    } catch (error: unknown) {
      console.error(`Fetch failed: ${error}`);
      return null;
    }
  };

export const fetchNowPlayingMovies =
  async (): Promise<NowPlayingMoviesResponse | null> => {
    const url = `${import.meta.env.VITE_API_URL}/movies/now_playing`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        return null;
      }

      return (await response.json()) as NowPlayingMoviesResponse;
    } catch (error: unknown) {
      console.error(`Fetch failed: ${error}`);
      return null;
    }
  };

export const fetchMovieById = async (
  movieId: string,
): Promise<MovieDetails | null> => {
  const url = `${import.meta.env.VITE_API_URL}/movies/details/${movieId}?append_to_response=credits`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return (await response.json()) as MovieDetails;
  } catch (error: unknown) {
    console.error(`Fetch failed: ${error}`);
    return null;
  }
};
