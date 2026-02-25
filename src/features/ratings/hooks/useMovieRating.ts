// import { useQuery } from "@tanstack/react-query";
// import { getMovieRating } from "../services/rating.service";

// export const useMovieRating = (movieId: number, userId: string) => {
//   return useQuery({
//     queryKey: ["movie-rating", movieId, userId],
//     queryFn: () => getMovieRating(movieId, userId),
//     staleTime: 1000 * 60 * 60, // 60 minutes
//     enabled: !!userId,
//   });
// };
