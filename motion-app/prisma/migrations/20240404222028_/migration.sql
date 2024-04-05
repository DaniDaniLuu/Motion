/*
  Warnings:

  - You are about to drop the column `previousCursor` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `cursor` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "previousCursor",
ADD COLUMN     "cursor" TEXT NOT NULL;
