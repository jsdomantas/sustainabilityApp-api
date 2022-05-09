/*
  Warnings:

  - Added the required column `photoUrl` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_IngredientToOffer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToOffer_AB_unique" ON "_IngredientToOffer"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToOffer_B_index" ON "_IngredientToOffer"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToOffer" ADD FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToOffer" ADD FOREIGN KEY ("B") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
