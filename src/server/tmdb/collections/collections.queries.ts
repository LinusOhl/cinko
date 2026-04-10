import { queryOptions } from "@tanstack/react-query";
import { fetchCollectionFn } from "./collections.fns";

export const collectionQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["collection", id],
    queryFn: () => fetchCollectionFn({ data: { id } }),
  });
