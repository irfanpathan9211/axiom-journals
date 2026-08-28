"use client";

export default function PrintButton() {
  return (
    <button className="side-btn" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
