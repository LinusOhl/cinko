import { supabase } from "../config/supabaseClient";
import type {
  MovieRating,
  // MovieReview,
  MovieReviewWithRating,
} from "../types/user.types";

// Format database data from snake_case to camelCase
// Create the different types
// Go over, and update all types

export const getMovieRating = async (
  movieId: number,
  userId: string,
): Promise<MovieRating> => {
  const { data, error } = await supabase
    .from("ratings")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch rating: ${error.message}`);
  }

  return data as MovieRating;
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
    throw new Error(`Failed to rate movie: ${error.message}`);
  }
};

export const reviewMovie = async (
  text: string,
  movieId: number,
  userId?: string,
): Promise<void> => {
  if (!userId) {
    throw new Error("You must be logged in to review a movie!");
  }

  const { data: review } = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", userId)
    .maybeSingle();

  if (review) {
    throw new Error("You have already reviewed this movie.");
  }

  const { data: rating } = await supabase
    .from("ratings")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", userId)
    .maybeSingle();

  if (!rating) {
    throw new Error("You must have rated the movie to leave a review!");
  }

  if (text.trim().length <= 3) {
    throw new Error("The review must contain at least four characters.");
  }

  const { error } = await supabase.from("reviews").insert({
    movie_id: movieId,
    user_id: userId,
    text,
  });

  if (error) {
    throw new Error(`Failed to review movie: ${error.message}`);
  }
};

export const getAllReviews = async (
  movieId: number,
): Promise<MovieReviewWithRating[]> => {
  const { data, error } = await supabase
    .from("user_movie_feedback")
    .select("*")
    .eq("movie_id", movieId);

  if (error) {
    throw new Error(`Failed to fetch all reviews: ${error.message}`);
  }

  return data as MovieReviewWithRating[];
};

export const updateReview = async (
  value: string,
  reviewId: string,
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("reviews")
    .update({
      text: value,
    })
    .eq("id", reviewId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to update review: ${error.message}`);
  }
};
