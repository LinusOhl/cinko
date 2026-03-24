import { prisma } from "~/lib/prisma";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";

export const addToWatchlist = async (
  movie: TMDBMovie | TMDBMovieDetails,
  userId: string,
) => {
  const foundMovie = await prisma.movie.upsert({
    where: {
      id: movie.id,
    },
    update: {},
    create: {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path || null,
    },
  });

  return prisma.watchlistItem.create({
    data: {
      movieId: foundMovie.id,
      userId,
    },
  });
};
