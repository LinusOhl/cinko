import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "~/router";
import {
  getGlobalRatingsFn,
  getUserRatingFn,
  rateMovieFn,
} from "./ratings.fns";

export const useRateMovieMutation = () => {
  return useMutation({
    mutationFn: rateMovieFn,
    onSuccess: (data) =>
      queryClient.invalidateQueries({
        queryKey: ["user-rating", data?.movieId],
      }),
  });
};

export const userRatingQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["user-rating", movieId],
    queryFn: () => getUserRatingFn({ data: movieId }),
  });

export const globalRatingsQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["global-ratings", movieId],
    queryFn: () => getGlobalRatingsFn({ data: movieId }),
  });
