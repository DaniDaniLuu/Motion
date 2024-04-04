"use server";
import { db } from "./db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
  const { added, modified, removed } = transactionObject;

  console.log(`Added: \n\n ${added}`);

  // accounts [] , name , logo , added, modified, removed

  for (const account of accounts) {
    await db.bankAccount.create({
      data: {
        accountId: account.account_id,
        balance: account.balances.current,
        icon: logo,
        accountType: account.subtype,
        bankName: name,
        accessToken: access_token,
      },
    });
  }

  for (const transaction of added) {
    await db.transactions.create({
      data: {
        transactionId: transaction.transaction_id,
        amount: transaction.amount,
        category: transaction.category,
        merchantName: transaction.merchant_name,
        date: transaction.date,
        accountId: transaction.account_id,
      },
    });
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
