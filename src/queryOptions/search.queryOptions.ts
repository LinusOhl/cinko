import { queryOptions } from "@tanstack/react-query";
import { searchMovies } from "../services/search.movies";

export const searchMoviesQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["searchMovies", query],
    queryFn: () => searchMovies(query),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
