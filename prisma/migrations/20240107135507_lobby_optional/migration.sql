-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lobby_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lobby_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lobby_id_fkey" FOREIGN KEY ("lobby_id") REFERENCES "Lobby"("id") ON DELETE SET NULL ON UPDATE CASCADE;
