import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Publication ethics, peer review, copyright and privacy policies.",
};

export default function PoliciesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Publishing</span>
          <h1>
            Policies &amp; <em>Ethics</em>
          </h1>
          <p>Replace these sample sections with your official publication policies.</p>
        </div>
      </section>

      <section className="section">
        <div className="container policy-grid">
          <nav className="policy-nav">
            <a href="#ethics">Publication Ethics</a>
            <a href="#review">Peer Review</a>
            <a href="#copyright">Copyright</a>
            <a href="#privacy">Privacy</a>
          </nav>
          <article className="prose">
            <h2 id="ethics">Publication Ethics</h2>
            <p>
              Authors, reviewers and editors are expected to follow
              responsible research and publication practices. This sample
              policy should be replaced with the official policy of the
              publisher.
            </p>

            <h2 id="review">Peer Review</h2>
            <p>
              Manuscripts may undergo editorial screening and peer review
              before an editorial decision is made. The exact review model
              should be stated here.
            </p>

            <h2 id="copyright">Copyright</h2>
            <p>State copyright ownership, licensing and reuse permissions here.</p>

            <h2 id="privacy">Privacy Policy</h2>
            <p>
              Explain how author, reviewer and visitor information is
              collected, used, stored and protected.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
