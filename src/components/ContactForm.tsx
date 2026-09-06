"use client";

import { useState } from "react";
import { company } from "@/lib/company";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`رسالة من الموقع من ${name || "زائر"}`);
    const body = encodeURIComponent(`${message}\n\n---\nالاسم: ${name}\nالبريد: ${email}`);
    window.location.href = `mailto:${company.supportEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">الاسم</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900"
          placeholder="اسمك"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">البريد الإلكتروني</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">رسالتك</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900"
          placeholder="اكتب رسالتك هنا..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700"
      >
        إرسال الرسالة
      </button>
    </form>
  );
}
