import { pool } from "@/lib/db";

export interface DbArticle {
    id: number;
    title: string;
    slug: string;
    author: string;
    journal: string;
    category: string | null;
    tags: string | null;
    abstract: string | null;
    content: string;
    image: string | null;
    file_url: string | null;
    status: string;
    created_at: string;
}

export async function getPublishedArticles(): Promise<DbArticle[]> {
    const [rows] = await pool.query(
        "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC"
    );
    return rows as DbArticle[];
}

export async function getPublishedArticleBySlug(slug: string): Promise<DbArticle | null> {
    const [rows] = await pool.query(
        "SELECT * FROM articles WHERE slug = ? AND status = 'published' LIMIT 1",
        [slug]
    );
    const articles = rows as DbArticle[];
    return articles[0] || null;
}