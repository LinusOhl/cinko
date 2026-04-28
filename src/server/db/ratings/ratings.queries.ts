import { queryClient } from "~/router";
import { rateMovieFn } from "./ratings.fns";
import { useMutation } from "@tanstack/react-query";

export const useRateMovieMutation = () => {
  return useMutation({
    mutationFn: rateMovieFn,
    onSuccess: (data) =>
      queryClient.invalidateQueries({
        queryKey: ["rating", data?.movieId],
      }),
  });
};
