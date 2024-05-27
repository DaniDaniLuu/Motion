/*
  Warnings:

  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_transactionId_key" ON "Transactions"("transactionId");
