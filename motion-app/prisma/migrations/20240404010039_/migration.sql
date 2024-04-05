/*
  Warnings:

  - Changed the type of `balance` on the `BankAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "balance",
ADD COLUMN     "balance" INTEGER NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL;
