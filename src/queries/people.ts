import { queryOptions } from "@tanstack/react-query";
import { fetchPersonFn, fetchPopularPeopleFn } from "~/server/tmdb/people";

export const personQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["person", id],
    queryFn: () => fetchPersonFn({ data: { id } }),
  });

export const popularPeopleQueryOptions = () =>
  queryOptions({
    queryKey: ["popular-people"],
    queryFn: () => fetchPopularPeopleFn(),
  });
