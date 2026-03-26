import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authMiddleware } from "~/middlewares/auth-middleware";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";
import {
  addToWatchlist,
  getWatchlistItem,
  getWatchlistItems,
  removeFromWatchlist,
} from "./watchlist.prisma";

export const addToWatchlistFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.custom<TMDBMovie | TMDBMovieDetails>())
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return addToWatchlist(data, userId);
  });

export const getWatchlistItemFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(z.number())
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return getWatchlistItem(data, userId);
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

export const removeFromWatchlistFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.number())
  .handler(({ data, context }) => {
    if (!context.user) {
      return null;
    }

    const userId = context.user.id;

    return removeFromWatchlist(data, userId);
  });
