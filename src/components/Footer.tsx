import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            <span className="logo-mark">A</span>
            <span>
              <strong>AXIOM</strong>
              <small>JOURNALS</small>
            </span>
          </div>
          <p>Advancing knowledge through meaningful research and publication.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/journals">Journals</Link>
          <Link href="/about">About</Link>
          <Link href="/submit">Submit Manuscript</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h4>Policies</h4>
          <Link href="/policies">Publication Ethics</Link>
          <Link href="/policies#review">Peer Review</Link>
          <Link href="/policies#copyright">Copyright</Link>
          <Link href="/policies#privacy">Privacy</Link>
        </div>
      </div>
      <div className="copyright">© 2026 Axiom Journals. All Rights Reserved.</div>
    </footer>
  );
}
