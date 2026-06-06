"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="glass-panel rounded-[2rem] p-6 sm:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(form)),
          headers: { "Content-Type": "application/json" }
        });
        setSent(true);
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="field" name="name" placeholder="Name" required />
        <input className="field" name="email" placeholder="Email" required type="email" />
      </div>
      <input className="field mt-4" name="subject" placeholder="Subject" required />
      <textarea
        className="field mt-4 min-h-40 resize-y"
        name="message"
        placeholder="Message"
        required
      />
      <button className="btn-primary mt-5" type="submit">
        <Send size={18} />
        Send Message
      </button>
      {sent ? (
        <p className="mt-4 text-sm font-semibold text-cobalt">
          Message received. This local build is ready to connect to email or CRM.
        </p>
      ) : null}
    </form>
  );
}
