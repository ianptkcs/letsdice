/*
  Warnings:

  - A unique constraint covering the columns `[firebaseID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `system` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "system" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firebaseID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseID_key" ON "User"("firebaseID");