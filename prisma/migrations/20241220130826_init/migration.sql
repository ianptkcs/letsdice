-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firebaseUID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("firebaseUID")
);

-- CreateTable
CREATE TABLE "GameMaster" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUID" TEXT NOT NULL,

    CONSTRAINT "GameMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUID" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "gameMasterId" TEXT NOT NULL,
    "playerID" TEXT[],

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayerToTable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUID_key" ON "User"("firebaseUID");

-- CreateIndex
CREATE UNIQUE INDEX "GameMaster_userUID_key" ON "GameMaster"("userUID");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userUID_key" ON "Player"("userUID");

-- CreateIndex
CREATE INDEX "_PlayerToTable_B_index" ON "_PlayerToTable"("B");

-- AddForeignKey
ALTER TABLE "GameMaster" ADD CONSTRAINT "GameMaster_userUID_fkey" FOREIGN KEY ("userUID") REFERENCES "User"("firebaseUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userUID_fkey" FOREIGN KEY ("userUID") REFERENCES "User"("firebaseUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_gameMasterId_fkey" FOREIGN KEY ("gameMasterId") REFERENCES "GameMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
