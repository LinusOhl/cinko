import type {
  MovieDetails,
  MovieListResponse,
  NowPlayingMoviesResponse,
} from "../types/movies.types";

export const fetchPopularMovies = async (): Promise<MovieListResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/movies/popular`;

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

export const fetchTopRatedMovies = async (): Promise<MovieListResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/movies/top_rated`;

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

export const fetchNowPlayingMovies =
  async (): Promise<NowPlayingMoviesResponse> => {
    const url = `${import.meta.env.VITE_API_URL}/movies/now_playing`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as NowPlayingMoviesResponse;
    } catch (error: unknown) {
      throw new Error(`Fetch failed: ${error}`);
    }
  };

export const fetchMovieById = async (
  movieId: number,
): Promise<MovieDetails> => {
  const url = `${import.meta.env.VITE_API_URL}/movies/${movieId}/details?append_to_response=credits,images,similar,videos`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as MovieDetails;
  } catch (error: unknown) {
    throw new Error(`Fetch failed: ${error}`);
  }
};
