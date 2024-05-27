-- DropIndex
DROP INDEX "Transactions_transactionId_key";

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");
