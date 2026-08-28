import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A scholarly publishing platform focused on accessible, meaningful research.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Who We Are</span>
          <h1>
            About <em>Axiom</em>
          </h1>
          <p>A scholarly publishing platform focused on accessible, meaningful research.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Our Mission</span>
            <h2>
              Making research <em>matter.</em>
            </h2>
          </div>
          <div>
            <p className="muted">
              Axiom Journals is designed as a home for researchers, academics
              and scholars who want to share rigorous and useful knowledge.
              Replace this sample content with your official organization
              profile.
            </p>
            <p className="muted">
              Our platform can support journal discovery, article reading,
              author submissions, editorial information and publication
              policies.
            </p>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container center">
          <span className="eyebrow">Our Values</span>
          <h2>
            Built around <em>scholarship.</em>
          </h2>
          <div className="features">
            <div>
              <b>01</b>
              <h3>Integrity</h3>
              <p>Responsible and transparent scholarly communication.</p>
            </div>
            <div>
              <b>02</b>
              <h3>Quality</h3>
              <p>Supporting strong academic and research practices.</p>
            </div>
            <div>
              <b>03</b>
              <h3>Access</h3>
              <p>Making research easier to discover and read.</p>
            </div>
            <div>
              <b>04</b>
              <h3>Community</h3>
              <p>Connecting researchers across disciplines.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
