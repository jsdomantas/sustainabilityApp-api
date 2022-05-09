/*
  Warnings:

  - You are about to drop the `FoodCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodCollectionToIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodCollectionToIngredient" DROP CONSTRAINT "_FoodCollectionToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodCollectionToIngredient" DROP CONSTRAINT "_FoodCollectionToIngredient_B_fkey";

-- DropTable
DROP TABLE "FoodCollection";

-- DropTable
DROP TABLE "_FoodCollectionToIngredient";
