import { plaidClient } from "@/lib/plaid";
import { AccountsGetRequest } from "plaid/dist/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken } = body;
  const request: AccountsGetRequest = {
    access_token: accessToken,
  };
  try {
    const response = await plaidClient.accountsBalanceGet(request);
    const accounts = response.data.accounts;
    const item = response.data.item;
    return NextResponse.json({accounts, item})
  } catch (error) {
    // handle error
  }
}
