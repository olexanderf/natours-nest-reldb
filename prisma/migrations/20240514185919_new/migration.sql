/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'DIFFICULT');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "key_id" TEXT,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT DEFAULT 'default.jpg',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "passwordChangedAt" TIMESTAMP(3),
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "key_id" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "duration" INTEGER NOT NULL,
    "maxGroupSize" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "ratingsAverage" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "ratingsQuantity" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "priceDiscount" INTEGER,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageCover" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDates" TIMESTAMP(3)[],
    "startLocation" JSONB NOT NULL,
    "locations" JSONB NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuidesOfTour" (
    "guideEmail" TEXT NOT NULL,
    "tourName" TEXT NOT NULL,

    CONSTRAINT "GuidesOfTour_pkey" PRIMARY KEY ("guideEmail","tourName")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "key_id" TEXT,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorEmail" TEXT NOT NULL,
    "tourName" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_key_id_key" ON "users"("key_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_key_id_key" ON "tours"("key_id");

-- CreateIndex
CREATE UNIQUE INDEX "tours_name_key" ON "tours"("name");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_key_id_key" ON "reviews"("key_id");

-- AddForeignKey
ALTER TABLE "GuidesOfTour" ADD CONSTRAINT "GuidesOfTour_guideEmail_fkey" FOREIGN KEY ("guideEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuidesOfTour" ADD CONSTRAINT "GuidesOfTour_tourName_fkey" FOREIGN KEY ("tourName") REFERENCES "tours"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourName_fkey" FOREIGN KEY ("tourName") REFERENCES "tours"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
