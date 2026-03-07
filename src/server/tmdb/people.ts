import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import type { Person } from "~/types/tmdb";
import { tmdbFetch } from "./client";

export const fetchPersonFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return tmdbFetch<Person>(`/person/${data.id}`);
  });

export const fetchPopularPeopleFn = createServerFn({ method: "GET" }).handler(
  async () => {
    tmdbFetch("/person/popular");
  },
);
