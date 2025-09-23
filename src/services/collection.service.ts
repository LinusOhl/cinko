import { apiFetch } from "../lib/api";
import type { Collection } from "../types/collections.types";

export const fetchCollectionById = async (
  collectionId: number,
): Promise<Collection> => {
  return await apiFetch<Collection>(`/collections/${collectionId}`, {
    method: "GET",
  });
};
