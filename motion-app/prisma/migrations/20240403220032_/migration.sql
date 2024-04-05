/*
  Warnings:

  - You are about to drop the `PlaidAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaidAccount" DROP CONSTRAINT "PlaidAccount_userEmail_fkey";

-- DropTable
DROP TABLE "PlaidAccount";

-- CreateTable
CREATE TABLE "PlaidItem" (
    "accessToken" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "balance" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "subType" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaidItem_accessToken_key" ON "PlaidItem"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_bankName_key" ON "BankAccount"("bankName");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accessToken_key" ON "BankAccount"("accessToken");

-- AddForeignKey
ALTER TABLE "PlaidItem" ADD CONSTRAINT "PlaidItem_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_accessToken_fkey" FOREIGN KEY ("accessToken") REFERENCES "PlaidItem"("accessToken") ON DELETE CASCADE ON UPDATE CASCADE;
