import type { Metadata } from "next";
import SubmissionForm from "@/components/SubmissionForm";

export const metadata: Metadata = {
  title: "Submit Manuscript",
  description: "Prepare your research and send your manuscript to the editorial team.",
};

export default function SubmitPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">For Authors</span>
          <h1>
            Submit a <em>Manuscript</em>
          </h1>
          <p>Prepare your research and send your manuscript to the editorial team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container submit-grid">
          <div>
            <span className="eyebrow">Submission Process</span>
            <h2>
              From manuscript to <em>publication.</em>
            </h2>
            <div className="steps">
              <div>
                <b>01</b>
                <span>
                  <strong>Prepare</strong>
                  <small>
                    Follow the journal&apos;s author guidelines and prepare your
                    manuscript.
                  </small>
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>Submit</strong>
                  <small>Complete the submission form and upload your manuscript.</small>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>Review</strong>
                  <small>The editorial team coordinates peer review.</small>
                </span>
              </div>
              <div>
                <b>04</b>
                <span>
                  <strong>Decision</strong>
                  <small>Receive an editorial decision and next steps.</small>
                </span>
              </div>
            </div>
          </div>

          <SubmissionForm />
        </div>
      </section>

      <section className="section cream">
        <div className="container">
          <span className="eyebrow">Before You Submit</span>
          <h2>
            Author <em>checklist</em>
          </h2>
          <div className="check-grid">
            <div>✓ Original work</div>
            <div>✓ Proper citations</div>
            <div>✓ Author information</div>
            <div>✓ Manuscript formatting</div>
            <div>✓ Figures/tables prepared</div>
            <div>✓ Ethics requirements reviewed</div>
          </div>
        </div>
      </section>
    </>
  );
}
