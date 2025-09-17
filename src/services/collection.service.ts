import type { Collection } from "../types/collections.types";

export const fetchCollectionById = async (
  collectionId: number,
): Promise<Collection> => {
  const url = `${import.meta.env.VITE_API_URL}/collections/${collectionId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error: unknown) {
    throw new Error(`Fetch failed: ${error}`);
  }
};
