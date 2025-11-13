-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('READING_LIST', 'AESTHETIC_GOODS', 'BOUTIQUE', 'TALENT', 'INVESTMENT', 'NEWSLETTER', 'PODCAST');

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ResourceType" NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT,
    "image" TEXT,
    "isAffiliate" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resources_type_displayOrder_idx" ON "resources"("type", "displayOrder");

-- CreateIndex
CREATE INDEX "resources_published_idx" ON "resources"("published");
