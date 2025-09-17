import { supabase } from "../config/supabaseClient";
import type { MovieRating } from "../types/user.types";

export const getMovieRating = async (
  movieId: number,
  userId: string,
): Promise<MovieRating> => {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .select("*")
      .eq("movie_id", movieId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data as MovieRating;
  } catch (error: unknown) {
    throw new Error(`Failed to fetch rating: ${error}`);
  }
};

export const rateMovie = async (
  value: number,
  movieId: number,
  userId: string,
): Promise<void> => {
  const { error } = await supabase.from("ratings").upsert(
    {
      movie_id: movieId,
      user_id: userId,
      value,
    },
    {
      onConflict: "movie_id,user_id",
    },
  );

  if (error) {
    throw new Error(`Failed to rate error: ${error.message}`);
  }
};
