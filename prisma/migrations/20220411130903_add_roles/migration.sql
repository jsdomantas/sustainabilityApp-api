/*
  Warnings:

  - You are about to drop the column `userId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PantryItem` table. All the data in the column will be lost.
  - Added the required column `businessOwnerId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `PantryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_userId_fkey";

-- DropForeignKey
ALTER TABLE "PantryItem" DROP CONSTRAINT "PantryItem_userId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "userId",
ADD COLUMN     "businessOwnerId" INTEGER NOT NULL,
ADD COLUMN     "customerId" INTEGER;

-- AlterTable
ALTER TABLE "PantryItem" DROP COLUMN "userId",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'basic';

-- CreateTable
CREATE TABLE "BusinessOwner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BusinessOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessOwner" ADD CONSTRAINT "BusinessOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_businessOwnerId_fkey" FOREIGN KEY ("businessOwnerId") REFERENCES "BusinessOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryItem" ADD CONSTRAINT "PantryItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
