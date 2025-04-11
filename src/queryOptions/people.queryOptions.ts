import { queryOptions } from "@tanstack/react-query";
import { fetchPersonById } from "../services/people.services";

export const personQueryOptions = (personId: string) =>
  queryOptions({
    queryKey: ["person", personId],
    queryFn: () => fetchPersonById(personId),
  });
