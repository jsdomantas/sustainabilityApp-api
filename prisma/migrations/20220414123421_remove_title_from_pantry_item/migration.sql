/*
  Warnings:

  - You are about to drop the column `description` on the `PantryItem` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `PantryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PantryItem" DROP COLUMN "description",
DROP COLUMN "title";
