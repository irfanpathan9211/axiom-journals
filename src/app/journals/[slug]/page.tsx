import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journals, getJournalBySlug } from "@/data/journals";

export function generateStaticParams() {
  return journals.map((journal) => ({ slug: journal.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);
  if (!journal) return {};
  return {
    title: journal.name,
    description: journal.heroDescription,
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);
  if (!journal) notFound();

  return (
    <>
      <section className="journal-hero">
        <div className="container journal-hero-grid">
          <div>
            <span className="tag">{journal.field}</span>
            <h1>
              Journal of <em>{journal.name.replace("Journal of ", "")}</em>
            </h1>
            <p>{journal.heroDescription}</p>
            <div className="actions">
              <Link href="/submit" className="btn btn-primary">
                Submit to this Journal
              </Link>
              <Link href="#articles" className="btn btn-outline">
                Latest Articles
              </Link>
            </div>
          </div>
          <aside className="journal-box">
            <strong>JOURNAL INFORMATION</strong>
            <hr />
            <p>
              <b>ISSN</b>
              <span>{journal.issn}</span>
            </p>
            <p>
              <b>Frequency</b>
              <span>{journal.frequency}</span>
            </p>
            <p>
              <b>Review</b>
              <span>{journal.review}</span>
            </p>
            <p>
              <b>Language</b>
              <span>{journal.language}</span>
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <article>
            <span className="eyebrow">About the Journal</span>
            <h2>{journal.aboutHeading}</h2>
            <p className="muted">{journal.aboutText}</p>
            <h3>Aims &amp; Scope</h3>
            <ul className="check-list">
              {journal.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <aside className="sidebar">
            <div className="side-card">
              <h3>Quick Links</h3>
              <a href="#articles">Latest Articles</a>
              <Link href="/submit">Submit Manuscript</Link>
              <Link href="/policies">Publication Ethics</Link>
              <Link href="/contact">Editorial Contact</Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="articles" className="section cream">
        <div className="container">
          <span className="eyebrow">Latest Issue</span>
          <h2>
            Featured <em>Articles</em>
          </h2>
          <div className="article-list">
            {journal.articles.map((article) => (
              <Link
                className="article-row"
                href={`/articles/${article.slug}`}
                key={article.slug}
              >
                <span>RESEARCH ARTICLE</span>
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
