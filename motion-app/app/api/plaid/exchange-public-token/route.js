import { NextResponse } from "next/server";
import { plaidClient, sessionOptions } from "@/lib/plaid";

export async function POST(req, response) {
  const body = await req.json();
  const PUBLIC_TOKEN = body.public_token;
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: PUBLIC_TOKEN,
  });

  const ACCESS_TOKEN = exchangeResponse.data.access_token;
  const ITEM_ID = exchangeResponse.data.item_id;

  return NextResponse.json({
    access_token: ACCESS_TOKEN,
    item_id: ITEM_ID,
    error: null,
  });
}
