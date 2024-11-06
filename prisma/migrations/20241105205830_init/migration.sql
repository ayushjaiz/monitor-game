-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BUGS', 'COMPLAINTS', 'CRASHES', 'PRAISES', 'OTHER');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "storeReviewId" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ratings" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_storeReviewId_key" ON "Review"("storeReviewId");

-- CreateIndex
CREATE INDEX "Review_date_idx" ON "Review"("date");

-- CreateIndex
CREATE INDEX "Review_category_idx" ON "Review"("category");

-- CreateIndex
CREATE INDEX "Review_date_category_idx" ON "Review"("date", "category");
