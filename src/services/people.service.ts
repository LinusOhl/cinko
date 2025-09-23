import { apiFetch } from "../lib/api";
import type { Person } from "../types/people.types";

export const fetchPersonById = async (personId: number): Promise<Person> => {
  return await apiFetch<Person>(
    `/people/${personId}?append_to_response=movie_credits`,
    {
      method: "GET",
    },
  );
};
