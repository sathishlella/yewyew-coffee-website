import { NextRequest, NextResponse } from "next/server";
import { syncInstagram } from "@/actions/syncInstagram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const bearer = request.headers.get("authorization")?.replace("Bearer ", "");

  if (cronSecret && bearer !== cronSecret && request.headers.get("x-vercel-cron") !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncInstagram();
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown sync error" },
      { status: 500 }
    );
  }
}
