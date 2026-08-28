import type { Metadata } from "next";
import { journals } from "@/data/journals";
import JournalFilter from "@/components/JournalFilter";

export const metadata: Metadata = {
  title: "Journals",
  description:
    "Explore Axiom Journals across management, science, technology and social sciences.",
};

export default function JournalsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Publications</span>
          <h1>
            Our <em>Journals</em>
          </h1>
          <p>
            Explore journals across management, science, technology and social
            sciences.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <JournalFilter journals={journals} />
        </div>
      </section>
    </>
  );
}
