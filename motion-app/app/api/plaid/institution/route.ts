import { plaidClient } from "@/lib/plaid";
import { InstitutionsGetByIdRequest, CountryCode } from "plaid/dist/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { institutionID } = body;
  const request: InstitutionsGetByIdRequest = {
    institution_id: institutionID,
    country_codes: [CountryCode.Us],
    options: {
      include_optional_metadata: true,
    },
  };
  try {
    const response = await plaidClient.institutionsGetById(request);
    const institution = response.data.institution;

    return NextResponse.json({ institution });
  } catch (error) {
    // Handle error
  }
}
