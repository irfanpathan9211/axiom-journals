import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedArticleBySlug } from "@/lib/articles";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description:
      article.abstract ||
      `${article.title} — a research article published in ${article.journal}.`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const tags = article.tags
    ? article.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <section className="article-head">
        <div className="container article-wrap">
          <span className="tag">RESEARCH ARTICLE</span>
          <h1>{article.title}</h1>
          <p className="authors">
            {article.author} · {article.journal} ·{" "}
            {new Date(article.created_at).getFullYear()}
          </p>
          <div className="article-meta">
            {article.category && <span>{article.category}</span>}
            <span>
              Published: {new Date(article.created_at).toLocaleDateString()}
            </span>
            <span>DOI: Coming Soon</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <article className="prose">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%", borderRadius: 8, marginBottom: 24 }}
              />
            )}

            {article.abstract && (
              <div className="abstract">
                <strong>Abstract</strong>
                <p>{article.abstract}</p>
              </div>
            )}

            {tags.length > 0 && (
              <div className="tags" style={{ margin: "16px 0" }}>
                {tags.map((tag) => (
                  <span key={tag} style={{ marginRight: 8 }} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="article-content" style={{ whiteSpace: "pre-wrap" }}>
              {article.content}
            </div>

            {article.file_url && (
              <p style={{ marginTop: 24 }}>
                <a href={article.file_url} target="_blank" rel="noopener noreferrer">
                  Download full manuscript (PDF)
                </a>
              </p>
            )}
          </article>

          <aside className="sidebar">
            <div className="side-card">
              <h3>Article Tools</h3>
              <PrintButton />
              <Link href="/submit">Submit a Manuscript</Link>
              <Link href="/journals">Browse Journals</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}