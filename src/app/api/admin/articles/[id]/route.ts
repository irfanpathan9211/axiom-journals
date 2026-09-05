import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function checkAuth(req: NextRequest) {
    return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

function slugify(text: string) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

// Article update karne ke liye
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    const { title, author, journal, category, tags, abstract, content, image } = await req.json();

    if (!title || !author || !journal || !content) {
        return NextResponse.json({ error: "Title, author, journal aur content zaroori hain." }, { status: 400 });
    }

    const [existingRows] = await pool.query("SELECT slug FROM articles WHERE id = ?", [id]);
    const existingArticles = existingRows as any[];

    if (existingArticles.length === 0) {
        return NextResponse.json({ error: "Article nahi mila" }, { status: 404 });
    }

    let slug = slugify(title);
    const [slugRows] = await pool.query("SELECT id FROM articles WHERE slug = ? AND id != ?", [slug, id]);
    if ((slugRows as any[]).length > 0) slug = `${slug}-${Date.now()}`;

    await pool.query(
        `UPDATE articles
         SET title = ?, slug = ?, author = ?, journal = ?, category = ?, tags = ?, abstract = ?, content = ?, image = ?
         WHERE id = ?`,
        [title, slug, author, journal, category || null, tags || null, abstract || null, content, image || null, id]
    );

    return NextResponse.json({ success: true, slug });
}

// Article delete karne ke liye
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
}