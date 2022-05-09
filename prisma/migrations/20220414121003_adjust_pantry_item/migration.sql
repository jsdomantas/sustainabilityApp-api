/*
  Warnings:

  - Added the required column `pantryCategory` to the `PantryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PantryItem" ADD COLUMN     "measurementUnits" TEXT,
ADD COLUMN     "pantryCategory" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER,
ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "isExpired" SET DEFAULT false;
