/*
  Warnings:

  - You are about to drop the column `subType` on the `BankAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `PlaidItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountType` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `BankAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "BankAccount_accessToken_key";

-- DropIndex
DROP INDEX "BankAccount_bankName_key";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "subType",
ADD COLUMN     "accountType" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlaidItem_userEmail_key" ON "PlaidItem"("userEmail");
