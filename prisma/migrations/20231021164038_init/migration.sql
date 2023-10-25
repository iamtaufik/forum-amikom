/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoryOnPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('UKM', 'AMIKOM', 'Berita', 'Saran');

-- DropForeignKey
ALTER TABLE "categoryOnPost" DROP CONSTRAINT "categoryOnPost_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categoryOnPost" DROP CONSTRAINT "categoryOnPost_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'AMIKOM';

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "categoryOnPost";

-- CreateIndex
CREATE UNIQUE INDEX "students_googleId_key" ON "students"("googleId");
