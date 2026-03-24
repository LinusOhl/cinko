import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";
import { addToWatchlist } from "./watchlist.prisma";

export const addToWatchlistFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: { movie: TMDBMovie | TMDBMovieDetails }) => data)
  .handler(({ data, context }) => {
    const userId = context.user.id;
    return addToWatchlist(data.movie, userId);
  });
