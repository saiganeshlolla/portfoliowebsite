import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ENGINEER_PROFILE } from "../data";

interface Template {
  id: string;
  label: string;
  subject: string;
  body: string;
}

const firstName = ENGINEER_PROFILE.name.split(" ")[0];

const TEMPLATES: Template[] = [
  {
    id: "hiring",
    label: "💼 Hiring Inquiry",
    subject: "Opportunities at [Company]",
    body: `Hi ${firstName},\n\nI came across your systems engineering portfolio and was really impressed by your work on Orion Canvas and ChronosDB. We are currently looking for a Senior Engineer at [Company] and would love to chat about your background.\n\nBest,\n[Your Name]`
  },
  {
    id: "consulting",
    label: "🛠️ Consulting Project",
    subject: "Technical Architecture Consultation",
    body: `Hi ${firstName},\n\nWe are looking to optimize our caching pipelines and database architectures for an upcoming product launch. I'd love to consult with you on Redis Pipelining and distributed cache designs.\n\nLet me know your availability.\n\nRegards,\n[Your Name]`
  },
  {
    id: "chat",
    label: "☕ Coffee / Tech Chat",
    subject: "Developer Networking & Chat",
    body: `Hi ${firstName},\n\nI read your blog post on React 19 Actions and would love to connect to discuss frontend compiler innovations and systems design over coffee or a quick video call.\n\nCheers,\n[Your Name]`
  }
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const applyTemplate = (tpl: Template) => {
    setSubject(tpl.subject);
    setMessage(tpl.body);
    setActiveTemplate(tpl.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate reliable async connection
    setTimeout(() => {
      setStatus("success");
      // Reset
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setActiveTemplate(null);
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-5 gap-8 bg-white dark:bg-[#0A0A0A] rounded-none border border-neutral-200 dark:border-neutral-800 p-6 md:p-8">
      
      {/* Template rail */}
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-500" />
          Quick Message Templates
        </h3>
        <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
          Click a template below to instantly draft a structured message with common developer prompts.
        </p>

        <div className="flex flex-col gap-2.5 pt-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => applyTemplate(tpl)}
              className={`w-full flex items-center justify-between text-left p-3.5 rounded-none border text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTemplate === tpl.id
                  ? "bg-emerald-50/50 border-emerald-500 text-emerald-700 dark:bg-[#101F18] dark:border-emerald-600 dark:text-emerald-400"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 dark:bg-[#111] dark:hover:bg-[#181818] dark:border-neutral-800 dark:text-neutral-450 dark:hover:text-white"
              }`}
            >
              <span>{tpl.label}</span>
              <ChevronRight className={`h-4 w-4 opacity-50 transition-transform ${activeTemplate === tpl.id ? "translate-x-1" : ""}`} />
            </button>
          ))}
        </div>
        
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/60 hidden md:block">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase">
            <Mail className="h-4.5 w-4.5 text-emerald-500" />
            <span>Direct: <strong>{ENGINEER_PROFILE.email}</strong></span>
          </div>
        </div>
      </div>

      {/* Actual contact form */}
      <div className="md:col-span-3">
        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center h-full min-h-[320px] p-4"
          >
            <div className="h-14 w-14 rounded-none border border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-black italic uppercase tracking-tight text-neutral-900 dark:text-white">MESSAGE_TRANSMITTED //</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-2">
              Thank you for reaching out. Your message has been sent to {firstName}'s queue. Expect a response within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs font-mono font-bold tracking-widest uppercase text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
            >
              // SEND_ANOTHER_MESSAGE
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-none border border-neutral-200 bg-white px-3.5 py-2 text-xs font-mono text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-none border border-neutral-200 bg-white px-3.5 py-2 text-xs font-mono text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of context"
                className="w-full rounded-none border border-neutral-200 bg-white px-3.5 py-2 text-xs font-mono text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                Your Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your custom proposal or update here..."
                className="w-full rounded-none border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white font-sans"
              />
            </div>

            {status === "error" && (
              <div className="flex gap-2.5 items-center p-3 rounded-none bg-rose-50 text-rose-700 text-xs border border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>Please complete all required parameters before transmittal.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-neutral-900 hover:bg-neutral-850 disabled:bg-neutral-300 text-xs font-mono font-bold tracking-widest uppercase text-white py-3 px-5 transition-colors cursor-pointer dark:bg-emerald-600 dark:hover:bg-emerald-700"
              id="submit-contact-form"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Transmitting Payload...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message //</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
