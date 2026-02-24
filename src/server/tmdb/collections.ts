import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { tmdbFetch } from "./client";

export const fetchCollectionFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    tmdbFetch(`/collection/${data.id}`);
  });
