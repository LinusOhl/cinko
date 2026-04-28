import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { rateMovie } from "./ratings.prisma";

export const rateMovieFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      ratings: z.record(z.string(), z.number()),
      movieId: z.number(),
    }),
  )
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return rateMovie(data.ratings, data.movieId, userId);
  });
