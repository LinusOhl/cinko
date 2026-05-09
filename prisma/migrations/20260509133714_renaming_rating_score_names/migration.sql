/*
  Warnings:

  - You are about to drop the column `productionDesignScore` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the column `visualEffectsScore` on the `rating` table. All the data in the column will be lost.
  - Added the required column `aestheticsScore` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effectsScore` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" DROP COLUMN "productionDesignScore",
DROP COLUMN "visualEffectsScore",
ADD COLUMN     "aestheticsScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "effectsScore" DOUBLE PRECISION NOT NULL;
