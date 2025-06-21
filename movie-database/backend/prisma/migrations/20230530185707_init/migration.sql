/*
  Warnings:

  - You are about to drop the column `salt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "salt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "salt";
