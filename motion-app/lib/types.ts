export interface TransactionInfo {
  transactionId: string;
  accountId: string;
  amount: number;
  category: Array<string>;
  merchantName: string | null;
  merchantLogo: string | null;
  date: string;
  cursor: string;
}

export type chartData = {
  daySince: number;
  prevMonth?: number;
  currMonth?: number;
};

export interface BankAccountInfo {
  accountId: string;
  balance: number;
  icon: string | null;
  accountType: string;
  accountCategory: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
}

