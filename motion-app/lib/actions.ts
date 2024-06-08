"use server";
import { db } from "./db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface BankAccountInfo {
  accountId: string;
  balance: number;
  icon: string | null;
  accountType: string;
  accountCategory: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
}

export async function addToDB(data: any) {
  const session = await getServerSession();
  const sessionEmail = session?.user.email;
  let existingUser;

  if (sessionEmail) {
    existingUser = await db.user.findUnique({ where: { email: sessionEmail } });
  } else {
    return NextResponse.json({ error: "No user found" });
  }

  const { image, plaidAccessToken } = data;

  if (plaidAccessToken) {
    await db.plaidItem.create({
      data: {
        accessToken: plaidAccessToken,
        userEmail: sessionEmail,
      },
    });
  }

  if (image) {
    await db.user.update({
      where: { email: sessionEmail },
      data: { image: image },
    });
  }
}

export async function addAccountInfo(access_token: string) {
  const balanceResponse = await fetch(
    "http://localhost:3000/api/plaid/balance",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: access_token }),
    }
  );

  const balanceObject = await balanceResponse.json();
  const {
    accounts,
    item: { institution_id },
  } = balanceObject;

  const institutionResponse = await fetch(
    "http://localhost:3000/api/plaid/institution",
    {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify({ institutionID: institution_id }),
    }
  );

  const institutionObject = await institutionResponse.json();
  const {
    institution: { name, logo },
  } = institutionObject;

  for (const account of accounts) {
    if (name == "Chase") {
      const existingBankAccount = await db.bankAccount.findUnique({
        where: { persistentID: account.persistent_account_id },
      });
      const existingTransactions = await db.transactions.findMany({
        where: { accountId: account.account_id },
      });
      //Checking to see if there is already a chase account in the db, if so updates the account id as well as any existing transactions
      if (existingBankAccount) {
        existingBankAccount.accountId = account.account_id;
        if (existingTransactions.length > 0) {
          for (const transaction of existingTransactions) {
            transaction.accountId = account.account_id;
          }
        }

        await updateTransactions([access_token]);
      } else {
        await db.bankAccount.create({
          data: {
            accountId: account.account_id,
            persistentID: account.persistent_account_id,
            balance: account.balances.current,
            icon: logo,
            accountType: account.subtype,
            accountCategory: account.type,
            bankName: name,
            accessToken: access_token,
          },
        });

        await updateTransactions([access_token]);
      }
    } else {
      const existingBankAccount = await db.bankAccount.findUnique({
        where: { accountId: account.account_id },
      });
      if (!existingBankAccount) {
        await db.bankAccount.create({
          data: {
            accountId: account.account_id,
            balance: account.balances.current,
            icon: logo,
            accountType: account.subtype,
            accountCategory: account.type,
            bankName: name,
            accessToken: access_token,
          },
        });

        await updateTransactions([access_token]);
      }
    }
  }
}

export async function updateTransactions(access_token_array: Array<string>) {
  const response = await getUser();
  const { existingUser } = await response.json();
  if (access_token_array.length == 0) {
    if (existingUser) {
      //Finding plaid items with matching emails
      const plaidItemArr = await db.plaidItem.findMany({
        where: { userEmail: existingUser.email },
      });
      if (plaidItemArr.length > 0) {
        for (const plaidItem of plaidItemArr) {
          access_token_array.push(plaidItem.accessToken);
        }
      } else {
        return "No bank accounts added yet.";
      }
    }
  }

  let hasAdded = false;

  // Finding all bank accounts with matching access tokens
  for (const access_token of access_token_array) {
    const bankAccountArr = await db.bankAccount.findMany({
      where: { accessToken: access_token },
    });
    for (const bankAccount of bankAccountArr) {
      let cursor = null;

      const transactions = await db.transactions.findMany({
        where: { accountId: bankAccount.accountId },
      });

      // There are existing transactions in the db that share the account id
      if (transactions.length != 0) {
        const mostRecentTransaction = transactions[transactions.length - 1];
        cursor = mostRecentTransaction.cursor;
      }

      const transactionResponse = await fetch(
        "http://localhost:3000/api/plaid/transactions",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ access_token: access_token, cursor: cursor }),
        }
      );

      const transactionObject = await transactionResponse.json();
      const { added, modified, removed, returnCursor } = transactionObject;

      if (added && added.length > 0 && returnCursor) {
        let addedTrans = added.filter((transaction: any) => {
          return transaction.account_id === bankAccount.accountId;
        });

        for (const transaction of addedTrans) {
          hasAdded = true;

          await db.transactions.create({
            data: {
              transactionId: transaction.transaction_id,
              accountId: transaction.account_id,
              amount: transaction.amount,
              category: transaction.category,
              merchantName: transaction.merchant_name
                ? transaction.merchant_name
                : "None",
              merchantLogo: transaction.logo_url
                ? transaction.logo_url
                : "None",
              date: transaction.date,
              cursor: returnCursor,
            },
          });
        }
      }
    }
  }
  if (hasAdded) {
    return "Added new transactions!";
  } else {
    return "No new transactions found!";
  }
}

export async function getUser() {
  const session = await getServerSession();
  const sessionEmail = session?.user.email;

  if (sessionEmail) {
    const user = await db.user.findUnique({ where: { email: sessionEmail } });
    return NextResponse.json({ existingUser: user });
  } else {
    return NextResponse.json({ error: "No user found" });
  }
}

export async function getInfoAccountTab() {
  interface accountInfo {
    icon?: string;
    bankName: string;
    balance: number;
    accountType: string;
  }

  const userResponse = await getUser();
  const { existingUser } = await userResponse.json();
  if (existingUser) {
    //Finding plaid items with matching emails
    const plaidItemArr = await db.plaidItem.findMany({
      where: { userEmail: existingUser.email },
    });
    let bankAccount = [];
    for (const plaidItem of plaidItemArr) {
      const bankAccountArr = await db.bankAccount.findMany({
        where: { accessToken: plaidItem.accessToken },
      });
    }
  }
}

export async function fetchStoredBankInfo() {
  const response = await getUser();
  const { existingUser } = await response.json();
  if (existingUser) {
    //Finding plaid items with matching emails
    const plaidItemArr = await db.plaidItem.findMany({
      where: { userEmail: existingUser.email },
    });
    let bankAccounts = [];
    for (const plaidItem of plaidItemArr) {
      const bankAccountArr = await db.bankAccount.findMany({
        where: { accessToken: plaidItem.accessToken },
      });
      for (const account of bankAccountArr) {
        bankAccounts.push(account);
      }
    }
    return bankAccounts;
  }
}

export async function fetchStoredTransactions(
  bankAccountArr: BankAccountInfo[]
) {
  console.log("Transaction Bank Accounts: ");
  console.log(bankAccountArr);
  if (bankAccountArr) {
    let transactions = [];
    for (const bankAccount of bankAccountArr) {
      const transactionArr = await db.transactions.findMany({
        where: { accountId: bankAccount.accountId },
      });
      transactions.push(transactionArr);
    }
    console.log("Returned Transactions: ");
    console.log(transactions);
    return transactions.flat();
  }
}

export async function getBankIcon(accountID: string): Promise<string> {
  const bankAccount = await db.bankAccount.findFirst({
    where: { accountId: accountID },
  });
  let bankName = "";
  if (bankAccount) {
    bankName = bankAccount.bankName;
  }

  let customImageSource = "/bank-icons/" + bankName + ".png";
  return customImageSource;
}


