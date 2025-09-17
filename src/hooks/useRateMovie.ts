import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateMovie } from "../services/user.service";

export const useRateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rating: {
      value: number;
      movieId: number;
      userId: string;
    }) => rateMovie(rating.value, rating.movieId, rating.userId),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["movie-rating", variables.movieId, variables.userId],
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
