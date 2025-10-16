import { useQuery } from "@tanstack/react-query";
import { getUserWatchlistItem } from "../services/watchlist.service";

export const useWatchlistItem = (movieId: number, userId: string) => {
  return useQuery({
    queryKey: ["watchlist-item", movieId],
    queryFn: () => getUserWatchlistItem(movieId, userId),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
};
