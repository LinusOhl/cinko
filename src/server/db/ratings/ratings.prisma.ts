import { prisma } from "~/lib/prisma";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";

export const rateMovie = async (
  ratings: Record<string, number>,
  movie: TMDBMovie | TMDBMovieDetails,
  userId: string,
) => {
  const foundMovie = await prisma.movie.upsert({
    create: {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path || null,
    },
    update: {},
    where: {
      id: movie.id,
    },
  });

  const avgScore =
    Object.values(ratings).reduce((acc, cur) => acc + cur) /
    Object.keys(ratings).length;

  const overallScore = Number(avgScore.toFixed(1));

  return prisma.rating.upsert({
    create: {
      actingScore: ratings.acting,
      cinematographyScore: ratings.cinematography,
      directionScore: ratings.direction,
      editingScore: ratings.editing,
      musicScore: ratings.music,
      productionDesignScore: ratings.productionDesign,
      soundScore: ratings.sound,
      visualEffectsScore: ratings.visualEffects,
      writingScore: ratings.writing,
      overallScore,
      movieId: foundMovie.id,
      userId,
    },
    update: {
      actingScore: ratings.acting,
      cinematographyScore: ratings.cinematography,
      directionScore: ratings.direction,
      editingScore: ratings.editing,
      musicScore: ratings.music,
      productionDesignScore: ratings.productionDesign,
      soundScore: ratings.sound,
      visualEffectsScore: ratings.visualEffects,
      writingScore: ratings.writing,
      overallScore,
    },
    where: {
      userId_movieId: { movieId: foundMovie.id, userId },
    },
  });
};

export const getUserRating = (movieId: number, userId: string) => {
  return prisma.rating.findUnique({
    where: {
      userId_movieId: { movieId, userId },
    },
  });
};

export const getGlobalRatings = (movieId: number) => {
  return prisma.rating.aggregate({
    _avg: {
      overallScore: true,
      actingScore: true,
      cinematographyScore: true,
      directionScore: true,
      editingScore: true,
      musicScore: true,
      productionDesignScore: true,
      soundScore: true,
      visualEffectsScore: true,
      writingScore: true,
    },
    _count: { _all: true },
    where: {
      movieId,
    },
  });
};
