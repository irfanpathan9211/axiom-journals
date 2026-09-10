import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function checkAuth(req: NextRequest) {
    return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

function slugify(text: string) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

// Publish the submission as an article
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    const [rows] = await pool.query("SELECT * FROM submissions WHERE id = ?", [id]);
    const submissions = rows as any[];

    if (submissions.length === 0) {
        return NextResponse.json({ error: "Submission not found" }, { status: 404 });
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
            sub.message || "Download the full manuscript from the file below.",
            sub.file_url,
        ]
    );

    await pool.query("DELETE FROM submissions WHERE id = ?", [id]);

    return NextResponse.json({ success: true, slug });
}

// Reject/Delete the submission
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    await pool.query("DELETE FROM submissions WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
}