import { plaidClient } from "@/lib/plaid";
import {
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
} from "plaid/dist/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let cursor = body.cursor;

  // New transaction updates since "cursor"
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  // Removed transaction ids
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;

  while (hasMore) {
    const request: TransactionsSyncRequest = {
      access_token: body.access_token,
      cursor: cursor,
    };
    const response = await plaidClient.transactionsSync(request);
    const data = response.data;
    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);
    hasMore = data.has_more;
    // Update cursor to the next cursor
    cursor = data.next_cursor;
  }
  return NextResponse.json({
    added: added,
    modified: modified,
    removed: removed,
    returnCursor: cursor,
  });
}
