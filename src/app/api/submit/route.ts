import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const authorName = formData.get("authorName") as string;
        const email = formData.get("email") as string;
        const journal = formData.get("journal") as string;
        const title = formData.get("title") as string;
        const message = formData.get("message") as string;
        const file = formData.get("file") as File | null;

        if (!authorName || !email || !journal || !title || !file) {
            return NextResponse.json({ error: "Author name, email, journal, title and file are required." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads", "manuscripts");
        await mkdir(uploadDir, { recursive: true });

        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
        await writeFile(path.join(uploadDir, safeName), buffer);
        const fileUrl = `/uploads/manuscripts/${safeName}`;

        await pool.query(
            `INSERT INTO submissions (author_name, email, journal, title, message, file_url, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
            [authorName, email, journal, title, message || null, fileUrl]
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Submission error:", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}