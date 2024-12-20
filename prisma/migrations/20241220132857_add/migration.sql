/*
  Warnings:

  - Added the required column `username` to the `GameMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameMaster" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "username" TEXT NOT NULL;
