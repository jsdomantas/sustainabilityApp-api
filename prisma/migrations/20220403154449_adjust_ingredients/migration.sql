/*
  Warnings:

  - You are about to drop the column `foodCollectionId` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `PantryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodCollectionId_fkey";

-- AlterTable
ALTER TABLE "FoodCollection" ADD COLUMN     "neededIngredients" INTEGER[];

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "foodCollectionId";

-- AlterTable
ALTER TABLE "PantryItem" ADD COLUMN     "ingredientId" INTEGER NOT NULL;
