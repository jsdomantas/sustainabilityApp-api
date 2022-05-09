/*
  Warnings:

  - Added the required column `latitude` to the `BusinessOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `BusinessOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BusinessOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usualPickupTime` to the `BusinessOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessOwner" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "usualPickupTime" TEXT NOT NULL;
