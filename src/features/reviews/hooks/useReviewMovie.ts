import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewMovie } from "../services/reviews.service";

export const useReviewMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: {
      text: string;
      movieId: number;
      userId: string;
    }) => reviewMovie(review.text, review.movieId, review.userId),
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
