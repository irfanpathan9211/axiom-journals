import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/data/journals";
import PrintButton from "@/components/PrintButton";

export function generateStaticParams() {
  return getAllArticles().map(({ article }) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) return {};
  return {
    title: result.article.title,
    description: `${result.article.title} — a research article published in ${result.journal.name}.`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) notFound();
  const { article, journal } = result;

  return (
    <>
      <section className="article-head">
        <div className="container article-wrap">
          <span className="tag">RESEARCH ARTICLE</span>
          <h1>{article.title}</h1>
          <p className="authors">
            {article.author} · {journal.name} · {article.year}
          </p>
          <div className="article-meta">
            <span>{article.volume}</span>
            <span>Published: {article.year}</span>
            <span>DOI: Coming Soon</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <article className="prose">
            <div className="abstract">
              <strong>Abstract</strong>
              <p>
                This is a sample article page. Replace this text with the
                official abstract, author details, keywords and full
                manuscript content. The layout supports long-form academic
                articles and can be extended with figures, tables and
                references.
              </p>
            </div>

            <h2>1. Introduction</h2>
            <p>
              Research in this area examines how the field creates and
              sustains value in changing environments. This template provides
              a clean reading experience for scholarly publications.
            </p>

            <h2>2. Literature Review</h2>
            <p>
              Use this section for the literature review and relevant
              citations. You can add headings, quotations, numbered lists,
              tables and figures without changing the overall layout.
            </p>

            <h2>3. Methodology</h2>
            <p>
              Describe the research design, sample, data collection and
              analytical approach here.
            </p>

            <h2>4. Results and Discussion</h2>
            <p>
              Present findings and discuss their implications for theory and
              practice.
            </p>

            <h2>5. Conclusion</h2>
            <p>
              Summarize the principal findings, limitations and opportunities
              for future research.
            </p>

            <h2>References</h2>
            <ol>
              <li>Author, A. (2026). Sample reference for demonstration.</li>
              <li>Author, B. (2025). Another sample reference.</li>
            </ol>
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
