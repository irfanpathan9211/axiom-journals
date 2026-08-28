import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about journals, submissions or publications? Send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h1>
            Contact <em>Us</em>
          </h1>
          <p>Questions about journals, submissions or publications? Send us a message.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Editorial Office</span>
            <h2>
              Let&apos;s <em>talk.</em>
            </h2>
            <p className="muted">
              Use the details below or the contact form. Replace the sample
              email and address with your official contact information.
            </p>
            <div className="contact-details">
              <p>
                <b>Email</b>
                <br />
                info@axiomjournals.in
              </p>
              <p>
                <b>Website</b>
                <br />
                axiomjournals.in
              </p>
              <p>
                <b>Office</b>
                <br />
                Madhya Pradesh, India
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
