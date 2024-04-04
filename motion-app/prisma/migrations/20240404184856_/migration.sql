/*
  Warnings:

  - A unique constraint covering the columns `[persistentAccountId]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `persistentAccountId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "persistentAccountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_persistentAccountId_key" ON "BankAccount"("persistentAccountId");
