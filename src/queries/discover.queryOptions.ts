import { queryOptions } from "@tanstack/react-query";
import { discoverMovies } from "../services/discover.service";

export const discoverMovieQueryOptions = (
  page: number,
  sortBy: string,
  pry?: string,
) =>
  queryOptions({
    queryKey: ["discoverMovies", page, sortBy, pry],
    queryFn: () => discoverMovies(page, sortBy, pry),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
