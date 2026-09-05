import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function checkAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [rows] = await pool.query(
    "SELECT * FROM submissions WHERE status = 'pending' ORDER BY created_at DESC"
  );
  return NextResponse.json({ submissions: rows });
}