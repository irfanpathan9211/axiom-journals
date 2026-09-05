import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function slugify(text: string) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function checkAuth(req: NextRequest) {
    return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [rows] = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
    return NextResponse.json({ articles: rows });
}

export async function POST(req: NextRequest) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, author, journal, category, tags, abstract, content, image } = await req.json();

    if (!title || !author || !journal || !content) {
        return NextResponse.json({ error: "Title, author, journal aur content zaroori hain." }, { status: 400 });
    }

    let slug = slugify(title);
    const [existing] = await pool.query("SELECT id FROM articles WHERE slug = ?", [slug]);
    if ((existing as any[]).length > 0) slug = `${slug}-${Date.now()}`;

    await pool.query(
        `INSERT INTO articles (title, slug, author, journal, category, tags, abstract, content, image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`,
        [title, slug, author, journal, category || null, tags || null, abstract || null, content, image || null]
    );

    return NextResponse.json({ success: true, slug });
}