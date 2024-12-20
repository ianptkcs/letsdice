/*
  Warnings:

  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Table` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_PlayerToTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `B` on the `_PlayerToTable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_PlayerToTable" DROP CONSTRAINT "_PlayerToTable_B_fkey";

-- AlterTable
ALTER TABLE "Table" DROP CONSTRAINT "Table_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Table_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_PlayerToTable" DROP CONSTRAINT "_PlayerToTable_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_PlayerToTable_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTable_B_index" ON "_PlayerToTable"("B");

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
