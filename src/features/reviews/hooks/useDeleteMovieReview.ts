import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../services/reviews.service";

export const useDeleteMovieReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      reviewId: string;
      movieId: number;
      userId: string;
    }) => deleteReview(data.reviewId, data.movieId, data.userId),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["movie-reviews", variables.movieId],
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
