/*
  Warnings:

  - You are about to drop the column `userId` on the `DeviceToken` table. All the data in the column will be lost.
  - Added the required column `userAuthId` to the `DeviceToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeviceToken" DROP CONSTRAINT "DeviceToken_userId_fkey";

-- AlterTable
ALTER TABLE "DeviceToken" DROP COLUMN "userId",
ADD COLUMN     "userAuthId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceToken" ADD CONSTRAINT "DeviceToken_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "User"("firebaseUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
