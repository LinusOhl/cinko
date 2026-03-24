import { useMutation } from "@tanstack/react-query";
import { addToWatchlistFn } from "./watchlist.fns";

export const useAddToWatchlistMutation = () => {
  return useMutation({
    mutationFn: addToWatchlistFn,
  });
};
