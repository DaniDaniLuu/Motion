import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { Products } from "plaid";

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
  ","
);

const PLAID_PRODUCTS = process.env.PLAID_PRODUCTS.split(",");

export async function POST(req) {
  const request = {
    user: { client_user_id: process.env.PLAID_CLIENT_ID },
    client_name: "Motion",
    language: "en",
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  };

  try {
    const tokenResponse = await plaidClient.linkTokenCreate(request);
    return NextResponse.json(tokenResponse.data);
  } catch (error) {
    console.log(error);
  }
}
