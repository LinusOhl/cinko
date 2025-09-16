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
) => {
  try {
    const existingRating = await supabase
      .from("ratings")
      .select("*")
      .eq("movie_id", movieId)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingRating.data) {
      await supabase
        .from("ratings")
        .update({
          value: value,
        })
        .eq("movie_id", movieId)
        .eq("user_id", userId);

      return;
    }

    const { data, error } = await supabase.from("ratings").insert({
      value,
      movie_id: movieId,
      user_id: userId,
    });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    console.log(data);
  } catch (error: unknown) {
    throw new Error(`Failed to rate movie: ${error}`);
  }
};
