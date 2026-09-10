"use client";

import { useState } from "react";

export default function SubmissionForm() {
  const [formMsg, setFormMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });‹‹

      const data = await res.json();

      if (res.ok) {
        setFormMsg("Your manuscript has been submitted! The editorial team will review it shortly.");
        form.reset();
      } else {
        setFormMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Manuscript Submission</h3>

      <label>
        Author Name
        <input required name="authorName" placeholder="Full name" />
      </label>

      <label>
        Email
        <input required type="email" name="email" placeholder="you@example.com" />
      </label>

      <label>
        Journal
        <select required name="journal" defaultValue="">
          <option value="" disabled>Select journal</option>
          <option value="Journal of Management">Journal of Management</option>
          <option value="Journal of Science">Journal of Science</option>
          <option value="Journal of Technology">Journal of Technology</option>
          <option value="Journal of Social Studies">Journal of Social Studies</option>
        </select>
      </label>

      <label>
        Manuscript Title
        <input required name="title" placeholder="Title of manuscript" />
      </label>

      <label>
        Message
        <textarea name="message" rows={5} placeholder="Brief note to the editor" />
      </label>

      <label>
        Manuscript File
        <input required type="file" name="file" accept=".pdf,.doc,.docx" />
      </label>

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Manuscript"}
      </button>

      {formMsg && <p className="form-msg">{formMsg}</p>}
    </form>
  );
}