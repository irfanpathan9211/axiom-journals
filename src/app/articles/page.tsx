import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse research articles published across Axiom Journals.",
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Latest Issue</span>
          <h1>
            Research <em>Articles</em>
          </h1>
          <p>Browse published articles across all Axiom Journals.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-list">
            {articles.length === 0 && (
              <p>No article has been published yet.</p>
            )}
            {articles.map((article) => (
              <Link
                className="article-row"
                href={`/articles/${article.slug}`}
                key={article.slug}
              >
                <span>RESEARCH ARTICLE · {article.journal.toUpperCase()}</span>
                <h3>{article.title}</h3>
                <p>
                  {article.author} · {new Date(article.created_at).getFullYear()}
                </p>
                <b>Read article →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

