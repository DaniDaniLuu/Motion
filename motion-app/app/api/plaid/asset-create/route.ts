import { plaidClient } from "@/lib/plaid";
import { AssetReportCreateRequest } from "plaid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, requestDays } = body;

  const request: AssetReportCreateRequest = {
    access_tokens: [accessToken],
    days_requested: requestDays,
  };

  try {
    const response = await plaidClient.assetReportCreate(request);
    const assetReportId = response.data.asset_report_id;
    const assetReportToken = response.data.asset_report_token;
  } catch (error) {
    console.log(error);
  }
}
