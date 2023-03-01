import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  response: NextResponse,
) {
  const datetime = new Date();
  const time = datetime.toLocaleTimeString();
  return NextResponse.json({ time, datetime });
}
