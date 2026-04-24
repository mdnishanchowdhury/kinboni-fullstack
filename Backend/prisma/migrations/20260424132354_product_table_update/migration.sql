/*
  Warnings:

  - You are about to drop the column `discountType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountValue` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discountType",
DROP COLUMN "discountValue",
DROP COLUMN "expiresAt",
DROP COLUMN "startAt",
ADD COLUMN     "flashDiscount" DOUBLE PRECISION,
ADD COLUMN     "flashExpiresAt" TIMESTAMP(3),
ADD COLUMN     "flashStartAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "order" SET DEFAULT 1;
