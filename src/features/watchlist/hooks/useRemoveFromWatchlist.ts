import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWatchlist } from "../services/watchlist.service";

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      itemId: string;
      movieId: number;
      userId: string;
    }) => removeFromWatchlist(data.itemId, data.movieId, data.userId),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["user-watchlist-item", variables.movieId],
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "cinkoRed",
      });
    },
  });
};
