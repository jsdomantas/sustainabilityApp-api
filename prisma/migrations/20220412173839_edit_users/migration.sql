/*
  Warnings:

  - Added the required column `phoneNumber` to the `BusinessOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessOwner" ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CustomerToOfferCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToOfferCategory_AB_unique" ON "_CustomerToOfferCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToOfferCategory_B_index" ON "_CustomerToOfferCategory"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToOfferCategory" ADD FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToOfferCategory" ADD FOREIGN KEY ("B") REFERENCES "OfferCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
