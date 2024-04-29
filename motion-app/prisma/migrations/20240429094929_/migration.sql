-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BankAccount"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;
