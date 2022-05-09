-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "businessOwnerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_businessOwnerId_fkey" FOREIGN KEY ("businessOwnerId") REFERENCES "BusinessOwner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
