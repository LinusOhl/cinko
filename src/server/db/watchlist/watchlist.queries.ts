import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "~/router";
import {
  addToWatchlistFn,
  getWatchlistItemFn,
  getWatchlistItemsFn,
  removeFromWatchlistFn,
} from "./watchlist.fns";

export const useAddToWatchlistMutation = () => {
  return useMutation({
    mutationFn: addToWatchlistFn,
    onSuccess: (data) =>
      queryClient.invalidateQueries({
        queryKey: ["watchlist-item", data?.movieId],
      }),
  });
};

export const watchlistItemQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["watchlist-item", movieId],
    queryFn: () => getWatchlistItemFn({ data: { movieId } }),
  });

export const watchlistItemsQueryOptions = () =>
  queryOptions({
    queryKey: ["watchlist-items"],
    queryFn: getWatchlistItemsFn,
  });

export const useRemoveFromWatchlistMutation = () => {
  return useMutation({
    mutationFn: removeFromWatchlistFn,
    onSuccess: (data) =>
      queryClient.invalidateQueries({
        queryKey: ["watchlist-item", data?.movieId],
      }),
  });
};
