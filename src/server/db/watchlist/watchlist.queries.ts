import { queryOptions, useMutation } from "@tanstack/react-query";
import { addToWatchlistFn, getWatchlistItemFn } from "./watchlist.fns";

export const useAddToWatchlistMutation = () => {
  return useMutation({
    mutationFn: addToWatchlistFn,
  });
};

export const watchlistItemQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["watchlist-item", movieId],
    queryFn: () => getWatchlistItemFn({ data: { movieId } }),
  });
