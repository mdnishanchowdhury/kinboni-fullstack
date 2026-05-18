/*
  Warnings:

  - The values [OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'KIDS', 'UNSPECIFIED');
ALTER TABLE "public"."user" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
ALTER TABLE "user" ALTER COLUMN "gender" SET DEFAULT 'UNSPECIFIED';
COMMIT;
