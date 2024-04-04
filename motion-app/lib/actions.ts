"use server";
import { db } from "./db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { TransactionsSyncRequest } from "plaid";
import { plaidClient } from "./plaid";

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
  const response = await getUser();
  const { existingUser } = await response.json();

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

  const transactionResponse = await fetch(
    "http://localhost:3000/api/plaid/transactions",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ access_token: access_token }),
    }
  );

  const transactionObject = await transactionResponse.json();
  console.log(transactionObject);
  const { added, modified, removed } = transactionObject;

  // accounts [] , name , logo , added, modified, removed

  console.log(accounts);

  for (const account of accounts) {
    let variableAccountId;
    try {
      console.log(name);
      if (name == "Chase") {
        console.log("User attempted add Chase account");
        const existingBankAccount = await db.bankAccount.findUnique({
          where: { persistentID: account.persistent_account_id },
        });
        const existingTransactions = await db.transactions.findMany({
          where: { accountId: account.account_id },
        });
        //Checking to see if there is already a chase account in the db, if so updates the account id as well as any existing transactions
        if (existingBankAccount) {
          console.log("Duplicate account found, updating account id");
          existingBankAccount.accountId = account.account_id;
          if (existingTransactions.length > 0) {
            console.log("Updating existing transactions account id");
            for (const transaction of existingTransactions) {
              transaction.accountId = account.account_id;
            }
          }
          console.log(
            "Updated existing bank account id's and related transactions!"
          );
        } else {
          await db.bankAccount.create({
            data: {
              accountId: account.account_id,
              persistentID: account.persistent_account_id,
              balance: account.balances.current,
              icon: logo,
              accountType: account.subtype,
              bankName: name,
              accessToken: access_token,
            },
          });
          console.log("Bank account created successfully!");
        }
      }

      // If creation is successful, proceed with your logic
    } catch (error: any) {
      // Check if the error is due to a unique constraint violation
      if (error.code === "P2002") {
        // Handle the unique constraint conflict here
        console.log("Bank account creation failed due to duplicate entry.");
      } else {
        // Handle other errors
        console.error("Error creating bank account:", error);
      }
    }
    updateTransactions([access_token]);
  }
}

export async function updateTransactions(access_token_array: Array<string>) {
  const response = await getUser();
  const { existingUser } = await response.json();
  if (!access_token_array) {
    console.log("No access tokens provided");
    access_token_array = [];
    if (existingUser) {
      //Finding plaid items with matching emails
      const plaidItemArr = await db.plaidItem.findMany({
        where: { userEmail: existingUser.email },
      });
      if (plaidItemArr.length > 0) {
        for (const plaidItem of plaidItemArr) {
          access_token_array.push(plaidItem.accessToken);
        }
      }
    }
  }
  console.log("Access tokens provided for sync: ", access_token_array);

  // Finding all bank accounts with matching access tokens
  for (const access_token of access_token_array) {
    const bankAccountArr = await db.bankAccount.findMany({
      where: { accessToken: access_token },
    });
    for (const bankAccount of bankAccountArr) {
      const transactions = await db.transactions.findMany({
        where: { accountId: bankAccount.accountId },
      });
      // There are existing transactions in the db that share the account id
      const mostRecentTransaction = transactions[transactions.length - 1];
      let cursor = null;
      if (mostRecentTransaction) {
        cursor = mostRecentTransaction.cursor;
      }

      let added;
      let modified;
      let removed;
      let accounts;
      let next_cursor;
      if (cursor) {
        let hasMore = true;
        const request: TransactionsSyncRequest = {
          access_token: bankAccount.accessToken,
          cursor: cursor,
        };
        const response = await plaidClient.transactionsSync(request);
        const data = response.data;

        if (data.accounts) {
          accounts = data.accounts;
        }
        if (data.added) {
          added = data.added;
        }
        if (data.modified) {
          modified = data.modified;
        }
        if (data.removed) {
          removed = data.removed;
        }
        if (data.next_cursor) {
          next_cursor = data.next_cursor;
        }
      } else {
        const request: TransactionsSyncRequest = {
          access_token: bankAccount.accessToken,
        };
        const response = await plaidClient.transactionsSync(request);
        const data = response.data;

        if (data.accounts) {
          accounts = data.accounts;
        }
        if (data.added) {
          added = data.added;
        }
        if (data.modified) {
          modified = data.modified;
        }
        if (data.removed) {
          removed = data.removed;
        }
        if (data.next_cursor) {
          next_cursor = data.next_cursor;
        }
      }
      if (added && added.length > 0 && next_cursor) {
        for (const transaction of added) {
          if (transaction.merchant_name) {
            await db.transactions.create({
              data: {
                transactionId: transaction.transaction_id,
                amount: transaction.amount,
                date: transaction.date,
                cursor: next_cursor,
                accountId: transaction.account_id,
                merchantName: transaction.merchant_name,
              },
            });
          }
        }
        console.log(added);
        console.log("Transactions updated successfully!");
      } else {
        console.log("No new transactions found!");
      }
    }
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

/*




for EACH plaidItem -> for EACH bankAccount -> 
{
    icon:
    bankName:
    balance:
    accountType:
}

return this object in an array
*/

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
      console.log(bankAccountArr);
    }
  }
}
