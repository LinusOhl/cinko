import { prisma } from "~/lib/prisma";

export const rateMovie = (
  ratings: Record<string, number>,
  movieId: number,
  userId: string,
) => {
  const overallScore =
    Object.values(ratings).reduce((acc, cur) => acc + cur) /
    Object.keys(ratings).length;

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
      movieId,
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
      userId_movieId: { movieId, userId },
    },
  });
};
