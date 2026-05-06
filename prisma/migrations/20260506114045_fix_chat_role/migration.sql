/*
  Warnings:

  - Changed the type of `role` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('USER', 'ASSISTANT');

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "role",
ADD COLUMN     "role" "ChatRole" NOT NULL;
