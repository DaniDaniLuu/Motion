-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "merchangeLogo" TEXT,
ALTER COLUMN "merchantName" DROP NOT NULL;
