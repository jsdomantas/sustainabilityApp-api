/*
  Warnings:

  - You are about to drop the column `neededIngredients` on the `FoodCollection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FoodCollection" DROP COLUMN "neededIngredients";

-- CreateTable
CREATE TABLE "FoodCollectionIngredient" (
    "id" SERIAL NOT NULL,
    "foodCollectionId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "FoodCollectionIngredient_pkey" PRIMARY KEY ("foodCollectionId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "FoodCollectionIngredient" ADD CONSTRAINT "FoodCollectionIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCollectionIngredient" ADD CONSTRAINT "FoodCollectionIngredient_foodCollectionId_fkey" FOREIGN KEY ("foodCollectionId") REFERENCES "FoodCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
