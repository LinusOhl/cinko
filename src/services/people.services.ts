import type { Person } from "../types/people.types";

export const fetchPersonById = async (personId: string): Promise<Person> => {
  const url = `${import.meta.env.VITE_API_URL}/people/${personId}?append_to_response=movie_credits`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as Person;
  } catch (error: unknown) {
    throw new Error(`Fetch failed: ${error}`);
  }
};
