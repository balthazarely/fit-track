import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST() {
  const currentUser = await getCurrentUser();
  return NextResponse.json(currentUser);
}
