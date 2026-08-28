import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/data/journals";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse research articles published across Axiom Journals.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

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
            {articles.map(({ article, journal }) => (
              <Link
                className="article-row"
                href={`/articles/${article.slug}`}
                key={article.slug}
              >
                <span>RESEARCH ARTICLE · {journal.name.toUpperCase()}</span>
                <h3>{article.title}</h3>
                <p>
                  {article.author} · {article.volume} · {article.year}
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
