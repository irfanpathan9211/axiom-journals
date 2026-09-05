import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function checkAuth(req: NextRequest) {
    return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

function slugify(text: string) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

// Publish karne ke liye
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    const [rows] = await pool.query("SELECT * FROM submissions WHERE id = ?", [id]);
    const submissions = rows as any[];

    if (submissions.length === 0) {
        return NextResponse.json({ error: "Submission nahi mili" }, { status: 404 });
    }

    const sub = submissions[0];

    let slug = slugify(sub.title);
    const [existing] = await pool.query("SELECT id FROM articles WHERE slug = ?", [slug]);
    if ((existing as any[]).length > 0) slug = `${slug}-${Date.now()}`;

    await pool.query(
        `INSERT INTO articles (title, slug, author, journal, abstract, content, file_url, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'published')`,
        [
            sub.title,
            slug,
            sub.author_name,
            sub.journal,
            sub.message || null,
            sub.message || "Full manuscript neeche diye gaye file se download karein.",
            sub.file_url,
        ]
    );

    await pool.query("DELETE FROM submissions WHERE id = ?", [id]);

    return NextResponse.json({ success: true, slug });
}

// Reject/Delete karne ke liye
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    await pool.query("DELETE FROM submissions WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
}