import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../services/reviews.service";

export const useUpdateMovieReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      text: string;
      reviewId: string;
      movieId: number;
      userId: string;
    }) => updateReview(data.text, data.reviewId, data.userId),
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
