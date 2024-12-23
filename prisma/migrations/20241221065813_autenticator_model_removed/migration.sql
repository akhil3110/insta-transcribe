/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Free', 'Pro', 'Enterprise');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'Free';

-- DropTable
DROP TABLE "Authenticator";
