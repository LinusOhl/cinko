import { supabase } from "../../../config/supabaseClient";
import type { WatchlistItem } from "../types";

export const addToWatchlist = async (
  movieId: number,
  userId: string,
): Promise<void> => {
  if (!userId) {
    throw new Error("You must be logged in to add a movie to your watchlist!");
  }

  const { error } = await supabase.from("watchlist").insert({
    movie_id: movieId,
    user_id: userId,
  });

  if (error) {
    throw new Error(`Failed to add to watchlist: ${error.message}`);
  }
};

export const removeFromWatchlist = async (
  itemId: string,
  movieId: number,
  userId: string,
): Promise<void> => {
  if (!userId) {
    throw new Error(
      "You must be logged in to remove a movie from your watchlist!",
    );
  }

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("id", itemId)
    .eq("movie_id", movieId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to remove from watchlist: ${error.message}`);
  }
};

export const getUserWatchlistItem = async (
  movieId: number,
  userId: string,
): Promise<WatchlistItem> => {
  if (!userId) {
    throw new Error("You must be logged in to fetch from your watchlist!");
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch from watchlist: ${error.message}`);
  }

  return data as WatchlistItem;
};

export const getUserWatchlist = async (
  userId: string,
): Promise<WatchlistItem[]> => {
  if (!userId) {
    throw new Error("You must be logged in to fetch your watchlist!");
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to fetch watchlist: ${error.message}`);
  }

  return data as WatchlistItem[];
};
