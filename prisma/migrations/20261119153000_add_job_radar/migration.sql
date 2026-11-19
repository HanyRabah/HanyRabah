-- CreateEnum
CREATE TYPE "JobSource" AS ENUM ('GREENHOUSE', 'ASHBY', 'LEVER', 'REMOTEOK', 'WUZZUF', 'BAYT', 'LINKEDIN_POSTS', 'OTHER');

-- CreateEnum
CREATE TYPE "CompanyTier" AS ENUM ('EGYPT_MENA', 'GLOBAL_AI', 'GLOBAL_SENIOR', 'GLOBAL_ENTERPRISE');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('NEW', 'SURFACED', 'APPLIED', 'DISMISSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "JobActionKind" AS ENUM ('APPLIED', 'DISMISSED', 'SAVED', 'DRAFTED_COVER');

-- CreateTable
CREATE TABLE "target_companies" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "source" "JobSource" NOT NULL,
  "tier" "CompanyTier" NOT NULL,
  "careersUrl" TEXT,
  "notes" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "lastFetched" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "target_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "target_companies_name_key" ON "target_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "target_companies_slug_source_key" ON "target_companies"("slug", "source");

-- CreateTable
CREATE TABLE "jobs" (
  "id" TEXT NOT NULL,
  "externalId" TEXT NOT NULL,
  "source" "JobSource" NOT NULL,
  "title" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "companyId" TEXT,
  "location" TEXT,
  "remote" BOOLEAN NOT NULL DEFAULT false,
  "description" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "salary" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "postedAt" TIMESTAMP(3),
  "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "score" INTEGER NOT NULL DEFAULT 0,
  "scoreReasons" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "visaFriendly" BOOLEAN,
  "remoteFromEgypt" BOOLEAN,
  "status" "JobStatus" NOT NULL DEFAULT 'NEW',
  CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_externalId_source_key" ON "jobs"("externalId", "source");

-- CreateIndex
CREATE INDEX "jobs_status_score_idx" ON "jobs"("status", "score");

-- CreateIndex
CREATE INDEX "jobs_fetchedAt_idx" ON "jobs"("fetchedAt");

-- CreateTable
CREATE TABLE "job_actions" (
  "id" TEXT NOT NULL,
  "jobId" TEXT NOT NULL,
  "kind" "JobActionKind" NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "job_actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_actions_jobId_key" ON "job_actions"("jobId");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "target_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_actions" ADD CONSTRAINT "job_actions_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
