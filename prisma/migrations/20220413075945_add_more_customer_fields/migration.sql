/*
  Warnings:

  - Added the required column `familyCardNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "familyCardNumber" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL;
