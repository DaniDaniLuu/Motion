"use server";
import { db } from "./db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function addToDB(data: any) {
  const session = await getServerSession();
  const sessionEmail = session?.user.email;
  if (sessionEmail) {
    const user = db.user.findUnique({ where: { email: sessionEmail } });
  } else {
    return NextResponse.json({ error: "No user found" });
  }

  const {image, plaidAccessToken } = data


}
