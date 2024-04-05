/*
  Warnings:

  - The primary key for the `BankAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BankAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_pkey",
DROP COLUMN "id",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Transactions" (
    "transactionId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT[],
    "merchantName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "accountId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_transactionId_key" ON "Transactions"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountId_key" ON "BankAccount"("accountId");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BankAccount"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;
