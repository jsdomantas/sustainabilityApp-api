/*
  Warnings:

  - You are about to drop the column `businessOwnerId` on the `Ingredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_businessOwnerId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "businessOwnerId";

-- CreateTable
CREATE TABLE "_BusinessOwnerToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessOwnerToIngredient_AB_unique" ON "_BusinessOwnerToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessOwnerToIngredient_B_index" ON "_BusinessOwnerToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_BusinessOwnerToIngredient" ADD FOREIGN KEY ("A") REFERENCES "BusinessOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessOwnerToIngredient" ADD FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
