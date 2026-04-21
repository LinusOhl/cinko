/*
  Warnings:

  - You are about to drop the column `score` on the `rating` table. All the data in the column will be lost.
  - Added the required column `actingScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinematographyScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directionScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editingScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionDesignScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soundScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visualEffectsScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writingScore` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" DROP COLUMN "score",
ADD COLUMN     "actingScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cinematographyScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "directionScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "editingScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "musicScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productionDesignScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soundScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "storyScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "visualEffectsScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "writingScore" DOUBLE PRECISION NOT NULL;
