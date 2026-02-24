import { queryOptions } from "@tanstack/react-query";
import { fetchCollectionFn } from "~/server/tmdb/collections";

export const collectionQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["collection", id],
    queryFn: () => fetchCollectionFn({ data: { id } }),
  });
