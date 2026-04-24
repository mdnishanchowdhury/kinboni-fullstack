/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `flashDiscount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `flashExpiresAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `flashStartAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `itemCategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the `ItemCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_itemCategoryId_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Product_itemCategoryId_idx";

-- DropIndex
DROP INDEX "SubCategory_name_categoryId_key";

-- DropIndex
DROP INDEX "SubCategory_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "flashDiscount",
DROP COLUMN "flashExpiresAt",
DROP COLUMN "flashStartAt",
DROP COLUMN "itemCategoryId",
DROP COLUMN "metadata",
ADD COLUMN     "discountType" TEXT,
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3),
ALTER COLUMN "oldPrice" DROP NOT NULL,
ALTER COLUMN "discountPercent" DROP NOT NULL,
ALTER COLUMN "aiStylistInfo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "slug",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "ItemCategory";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "subCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
