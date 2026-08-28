import Link from "next/link";
import type { Metadata } from "next";
import { journals } from "@/data/journals";

export const metadata: Metadata = {
  title: "Axiom Journals | Academic Research & Publications",
  description: "Axiom Journals - a modern academic publishing website.",
};

export default function HomePage() {
  const featured = journals.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Academic Research &amp; Publications</span>
            <h1>
              Advancing knowledge.
              <br />
              <em>Inspiring research.</em>
            </h1>
            <p className="lead">
              A modern platform for researchers, academicians and scholars to
              discover, publish and share meaningful research.
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href="/journals">
                Explore Journals
              </Link>
              <Link className="btn btn-outline" href="/submit">
                Submit a Manuscript
              </Link>
            </div>
          </div>
          <div className="hero-paper">
            <div className="paper-top">
              <span>AXIOM JOURNALS</span>
              <span>VOL. 01 · 2026</span>
            </div>
            <div className="seal">A</div>
            <h3>Knowledge Through Research</h3>
            <p>Discover · Publish · Share</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stat-grid">
          <div>
            <strong>10+</strong>
            <span>Academic Journals</span>
          </div>
          <div>
            <strong>1000+</strong>
            <span>Research Articles</span>
          </div>
          <div>
            <strong>50+</strong>
            <span>Countries Reached</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Online Access</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-heading">
            <div>
              <span className="eyebrow">Featured</span>
              <h2>
                Explore our <em>journals</em>
              </h2>
            </div>
            <Link className="text-link" href="/journals">
              View all journals →
            </Link>
          </div>
          <div className="cards-3">
            {featured.map((journal) => (
              <article className="card journal-card" key={journal.slug}>
                <span className="card-no">{journal.cardNo}</span>
                <div className="icon">{journal.icon}</div>
                <h3>{journal.name}</h3>
                <p>{journal.shortDescription}</p>
                <Link href={`/journals/${journal.slug}`}>View Journal →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container two-col">
          <div>
            <span className="eyebrow">For Authors</span>
            <h2>
              Turn your research into <em>impact.</em>
            </h2>
          </div>
          <div>
            <p className="muted">
              Submit original research through a simple workflow designed for
              authors. Learn about manuscript preparation, peer review and
              publication.
            </p>
            <Link className="btn btn-primary" href="/submit">
              Submission Guidelines
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <span className="eyebrow">Why Axiom</span>
          <h2>
            A platform built for <em>researchers</em>
          </h2>
          <div className="features">
            <div>
              <b>✓</b>
              <h3>Quality Research</h3>
              <p>Encouraging rigorous and meaningful scholarly work.</p>
            </div>
            <div>
              <b>◎</b>
              <h3>Global Reach</h3>
              <p>Make research accessible to readers worldwide.</p>
            </div>
            <div>
              <b>↗</b>
              <h3>Easy Publishing</h3>
              <p>A clear, convenient publishing workflow.</p>
            </div>
            <div>
              <b>★</b>
              <h3>Academic Community</h3>
              <p>Connect ideas, researchers and disciplines.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
