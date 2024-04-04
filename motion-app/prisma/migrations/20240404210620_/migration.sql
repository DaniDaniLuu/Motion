/*
  Warnings:

  - A unique constraint covering the columns `[persistentID]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "persistentID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_persistentID_key" ON "BankAccount"("persistentID");
