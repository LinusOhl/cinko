import type { Person } from "../types/people.types";

export const fetchPersonById = async (
  personId: string,
): Promise<Person | null> => {
  const url = `${import.meta.env.VITE_API_URL}/people/${personId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return (await response.json()) as Person;
  } catch (error: unknown) {
    console.error(`Fetch failed: ${error}`);
    return null;
  }
};
