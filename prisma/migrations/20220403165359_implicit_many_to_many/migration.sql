/*
  Warnings:

  - You are about to drop the `FoodCollectionIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodCollectionIngredient" DROP CONSTRAINT "FoodCollectionIngredient_foodCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "FoodCollectionIngredient" DROP CONSTRAINT "FoodCollectionIngredient_ingredientId_fkey";

-- DropTable
DROP TABLE "FoodCollectionIngredient";

-- CreateTable
CREATE TABLE "_FoodCollectionToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodCollectionToIngredient_AB_unique" ON "_FoodCollectionToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodCollectionToIngredient_B_index" ON "_FoodCollectionToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_FoodCollectionToIngredient" ADD FOREIGN KEY ("A") REFERENCES "FoodCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodCollectionToIngredient" ADD FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
