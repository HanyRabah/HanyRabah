/*
  Warnings:

  - The values [AESTHETIC_GOODS,BOUTIQUE] on the enum `ResourceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResourceType_new" AS ENUM ('READING_LIST', 'TECH_ESSENTIALS', 'WALLPAPERS', 'TALENT', 'INVESTMENT', 'NEWSLETTER', 'PODCAST');
ALTER TABLE "resources" ALTER COLUMN "type" TYPE "ResourceType_new" USING ("type"::text::"ResourceType_new");
ALTER TYPE "ResourceType" RENAME TO "ResourceType_old";
ALTER TYPE "ResourceType_new" RENAME TO "ResourceType";
DROP TYPE "public"."ResourceType_old";
COMMIT;

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "gumroadUrl" TEXT,
ADD COLUMN     "price" TEXT;
