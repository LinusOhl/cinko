import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../services/user.service";

export const useMovieReviews = (movieId: number) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => getAllReviews(movieId),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
};
