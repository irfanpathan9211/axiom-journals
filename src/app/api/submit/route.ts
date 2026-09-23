import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

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
            return NextResponse.json(
                { error: "Author name, email, journal, title and file are required." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload directly to Cloudinary from memory — no local disk write
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "manuscripts",
                    resource_type: "raw", // needed for non-image files like PDFs/docs
                    public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`,
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result as { secure_url: string });
                }
            );
            uploadStream.end(buffer);
        });

        const fileUrl = uploadResult.secure_url;

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