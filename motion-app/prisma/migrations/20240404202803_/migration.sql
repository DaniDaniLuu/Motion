/*
  Warnings:

  - You are about to drop the column `persistentAccountId` on the `BankAccount` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BankAccount_persistentAccountId_key";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "persistentAccountId";
