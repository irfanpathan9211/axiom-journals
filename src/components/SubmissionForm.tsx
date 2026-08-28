"use client";

import { useState } from "react";

export default function SubmissionForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Demo submission received. Connect this form to your backend/email service for real submissions."
    );
    event.currentTarget.reset();
  }

  return (
    <form id="submissionForm" className="form-card" onSubmit={handleSubmit}>
      <h3>Manuscript Submission</h3>

      <label>
        Author Name
        <input required name="author" placeholder="Full name" />
      </label>

      <label>
        Email
        <input required type="email" name="email" placeholder="you@example.com" />
      </label>

      <label>
        Journal
        <select required name="journal" defaultValue="">
          <option value="" disabled>
            Select journal
          </option>
          <option>Journal of Management</option>
          <option>Journal of Science</option>
          <option>Journal of Technology</option>
          <option>Journal of Social Studies</option>
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

      <button className="btn btn-primary" type="submit">
        Submit Manuscript
      </button>
      <p id="submissionMsg" className="form-msg">
        {message}
      </p>
      <small className="muted">
        Demo form: connect this form to your backend/email service before
        production use.
      </small>
    </form>
  );
}
