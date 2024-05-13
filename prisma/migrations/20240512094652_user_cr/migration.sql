/*
  Warnings:

  - A unique constraint covering the columns `[key_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "key_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_key_id_key" ON "User"("key_id");
