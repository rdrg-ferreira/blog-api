/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isAuthor` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isPublic",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAuthor",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
