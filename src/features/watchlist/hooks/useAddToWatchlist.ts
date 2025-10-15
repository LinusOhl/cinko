import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist } from "../services/watchlist.service";

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { movieId: number; userId: string }) =>
      addToWatchlist(data.movieId, data.userId),
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
