import { queryOptions } from "@tanstack/react-query";
import { discoverMovies } from "../services/discover.services";

export const discoverMovieQueryOptions = (page: number, sortBy: string) =>
  queryOptions({
    queryKey: ["discoverMovies", page, sortBy],
    queryFn: () => discoverMovies(page, sortBy),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
