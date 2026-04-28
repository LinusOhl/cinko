/*
  Warnings:

  - Added the required column `overallScore` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "overallScore" DOUBLE PRECISION NOT NULL;
