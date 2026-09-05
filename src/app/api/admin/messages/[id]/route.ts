import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function checkAuth(req: NextRequest) {
    return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    await pool.query("DELETE FROM contact_messages WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
}