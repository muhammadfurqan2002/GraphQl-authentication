/*
  Warnings:

  - You are about to drop the column `lastst_name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastst_name",
ADD COLUMN     "last_name" TEXT;
