/*
  Warnings:

  - You are about to drop the column `plaidAccessToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_plaidAccessToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plaidAccessToken";

-- CreateTable
CREATE TABLE "PlaidAccount" (
    "accessToken" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaidAccount_accessToken_key" ON "PlaidAccount"("accessToken");

-- AddForeignKey
ALTER TABLE "PlaidAccount" ADD CONSTRAINT "PlaidAccount_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
