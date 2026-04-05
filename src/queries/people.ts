import { queryOptions } from "@tanstack/react-query";
import { fetchPersonFn, fetchPopularPeopleFn } from "~/server/tmdb/people";

export const personQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["person", id],
    queryFn: () => fetchPersonFn({ data: { id } }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const popularPeopleQueryOptions = () =>
  queryOptions({
    queryKey: ["popular-people"],
    queryFn: () => fetchPopularPeopleFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
