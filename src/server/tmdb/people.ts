import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { tmdbFetch } from "./client";

export const fetchPersonFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    tmdbFetch(`/person/${data.id}`);
  });

export const fetchPopularPeopleFn = createServerFn({ method: "GET" }).handler(
  async () => {
    tmdbFetch("/person/popular");
  },
);
