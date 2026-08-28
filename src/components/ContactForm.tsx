"use client";

import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contactForm" className="form-card" onSubmit={handleSubmit}>
      <h3>Send a Message</h3>

      <label>
        Name
        <input required name="name" placeholder="Your name" />
      </label>

      <label>
        Email
        <input required type="email" name="email" placeholder="you@example.com" />
      </label>

      <label>
        Subject
        <input required name="subject" placeholder="Subject" />
      </label>

      <label>
        Message
        <textarea required name="message" rows={7} placeholder="Your message" />
      </label>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
      <p id="contactMsg" className="form-msg">
        {message}
      </p>
      <small className="muted">

      </small>
    </form>
  );
}