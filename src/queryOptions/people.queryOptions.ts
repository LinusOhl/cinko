import { queryOptions } from "@tanstack/react-query";
import { fetchPersonById } from "../services/people.services";

export const personQueryOptions = (personId: number) =>
  queryOptions({
    queryKey: ["person", personId],
    queryFn: () => fetchPersonById(personId),
  });
