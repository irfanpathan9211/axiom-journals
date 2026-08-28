"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Journal } from "@/data/journals";

export default function JournalFilter({ journals }: { journals: Journal[] }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("");

  const fields = useMemo(
    () => Array.from(new Set(journals.map((j) => j.field))),
    [journals]
  );

  const filtered = journals.filter((journal) => {
    const haystack = `${journal.name} ${journal.shortDescription} ${journal.field}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesField = !field || journal.field === field;
    return matchesQuery && matchesField;
  });

  return (
    <>
      <div className="filter-row">
        <input
          id="journalSearch"
          className="search"
          placeholder="Search journals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          id="fieldFilter"
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          <option value="">All fields</option>
          {fields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div id="journalList" className="cards-2">
        {filtered.map((journal) => (
          <article
            className="card journal-item"
            data-field={journal.field}
            key={journal.slug}
          >
            <div className="icon">{journal.icon}</div>
            <span className="tag">{journal.field}</span>
            <h2>{journal.name}</h2>
            <p>{journal.shortDescription}</p>
            <div className="meta">ISSN: {journal.issn} · {journal.review}</div>
            <Link
              className="btn btn-small btn-outline-dark"
              href={`/journals/${journal.slug}`}
            >
              Journal Details
            </Link>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="muted">No journals match your search.</p>
        )}
      </div>
    </>
  );
}
