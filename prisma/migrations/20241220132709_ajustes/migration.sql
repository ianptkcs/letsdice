/*
  Warnings:

  - The primary key for the `GameMaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GameMaster` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `GameMaster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_gameMasterId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToTable" DROP CONSTRAINT "_PlayerToTable_A_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "GameMaster" DROP CONSTRAINT "GameMaster_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GameMaster_pkey" PRIMARY KEY ("userUID");

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("userUID");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameMaster_id_key" ON "GameMaster"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_gameMasterId_fkey" FOREIGN KEY ("gameMasterId") REFERENCES "GameMaster"("userUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("userUID") ON DELETE CASCADE ON UPDATE CASCADE;
