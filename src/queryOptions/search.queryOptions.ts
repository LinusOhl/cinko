import { queryOptions } from "@tanstack/react-query";
import { searchMovies } from "../services/search.movies";

export const searchMoviesQueryOptions = (query: string, page: number) =>
  queryOptions({
    queryKey: ["searchMovies", query, page],
    queryFn: () => searchMovies(query, page),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
