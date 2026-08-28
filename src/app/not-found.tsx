import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="page-hero center">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>
          Page <em>Not Found</em>
        </h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link className="btn btn-primary" href="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
