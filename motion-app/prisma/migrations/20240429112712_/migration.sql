/*
  Warnings:

  - You are about to drop the column `merchangeLogo` on the `Transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "merchangeLogo",
ADD COLUMN     "merchantLogo" TEXT;
