import { queryOptions } from "@tanstack/react-query";
import { fetchPersonById } from "../services/people.service";

export const personQueryOptions = (personId: number) =>
  queryOptions({
    queryKey: ["person", personId],
    queryFn: () => fetchPersonById(personId),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
