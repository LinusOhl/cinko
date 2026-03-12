import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import type { Person } from "~/types/tmdb";
import { tmdbFetch } from "./client";

export const fetchPersonFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const searchParams = "?append_to_response=movie_credits";

    return tmdbFetch<Person>(`/person/${data.id}${searchParams}`);
  });

export const fetchPopularPeopleFn = createServerFn({ method: "GET" }).handler(
  async () => {
    tmdbFetch("/person/popular");
  },
);
