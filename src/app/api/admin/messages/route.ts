import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
    const cookie = req.cookies.get("admin_auth")?.value;

    if (cookie !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [rows] = await pool.query(
        "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    return NextResponse.json({ messages: rows });
}