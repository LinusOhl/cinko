import { queryOptions } from "@tanstack/react-query";
import { fetchCollectionById } from "../services/collection.service";

export const collectionOptions = (collectionId: number) =>
  queryOptions({
    queryKey: ["collection", collectionId],
    queryFn: () => fetchCollectionById(collectionId),
    staleTime: 1000 * 60 * 60, // 60 minutes
    enabled: !!collectionId,
  });
