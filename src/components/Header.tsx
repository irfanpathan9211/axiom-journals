"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DropdownKey = "journals" | "authors" | null;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  // Close any open dropdown when clicking outside of it (matches original script.js behaviour)
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // On mobile widths the dropdown buttons toggle open/closed instead of relying on hover
  function handleDropdownClick(
    event: React.MouseEvent<HTMLButtonElement>,
    key: Exclude<DropdownKey, null>
  ) {
    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      event.preventDefault();
      setOpenDropdown((prev) => (prev === key ? null : key));
    }
  }

  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" href="/">
          <span className="logo-mark">A</span>
          <span>
            <strong>AXIOM</strong>
            <small>JOURNALS</small>
          </span>
        </Link>

        <nav className={`navlinks${menuOpen ? " open" : ""}`} id="navlinks">
          <Link href="/">Home</Link>

          <div className={`dropdown${openDropdown === "journals" ? " open" : ""}`}>
            <button
              className="dropbtn"
              type="button"
              onClick={(e) => handleDropdownClick(e, "journals")}
            >
              Journals ▾
            </button>
            <div className="dropdown-menu">
              <Link href="/journals">All Journals</Link>
              <Link href="/journals/management">Journal of Management</Link>
              <Link href="/journals/science">Journal of Science</Link>
              <Link href="/journals/technology">Journal of Technology</Link>
              <Link href="/journals/social-studies">Journal of Social Studies</Link>
            </div>
          </div>

          <Link href="/about">About</Link>

          <div className={`dropdown${openDropdown === "authors" ? " open" : ""}`}>
            <button
              className="dropbtn"
              type="button"
              onClick={(e) => handleDropdownClick(e, "authors")}
            >
              For Authors ▾
            </button>
            <div className="dropdown-menu">
              <Link href="/submit">Submit Manuscript</Link>
              <Link href="/policies">Publication Ethics</Link>
              <Link href="/policies#review">Peer Review</Link>
              <Link href="/policies#copyright">Copyright</Link>
            </div>
          </div>

          <Link href="/articles">Articles</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <button
          className="menu"
          id="menu"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
