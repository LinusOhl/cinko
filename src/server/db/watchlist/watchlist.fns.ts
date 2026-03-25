import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";
import {
  addToWatchlist,
  getWatchlistItem,
  getWatchlistItems,
} from "./watchlist.prisma";

export const addToWatchlistFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: { movie: TMDBMovie | TMDBMovieDetails }) => data)
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return addToWatchlist(data.movie, userId);
  });

export const getWatchlistItemFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator((data: { movieId: number }) => data)
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return getWatchlistItem(data.movieId, userId);
  });

export const getWatchlistItemsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(({ context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return getWatchlistItems(userId);
  });
