"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Twitter, Download, Send } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import Section from "../Section";
import InteractiveHoverButton from "../InteractiveHoverButton";
import { personal, availability } from "../../lib/data";

const ACCENT = "var(--accent)";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [state, handleSubmit] = useForm("xanbyeqa");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inputClass =
    "w-full px-4 py-3 bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 rounded-[10px] text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30 transition-colors";

  return (
    <Section id="contact" eyebrow="08 / Contact" title="Let’s talk.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
            Have a question, a role, or a system you want a second opinion on?
            The fastest way to reach me is email; I reply to everything that
            isn’t automated.
          </p>

          {availability.open && (
            <p
              className="mb-8 rounded-[12px] border p-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--accent) 32%, transparent)",
                background: "color-mix(in srgb, var(--accent) 5%, transparent)",
              }}
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ backgroundColor: ACCENT }}
                aria-hidden="true"
              />
              {availability.statement}
            </p>
          )}

          <ul className="space-y-4 text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" style={{ color: ACCENT }} />
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-[color:var(--accent)] transition-colors"
              >
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" style={{ color: ACCENT }} />
              <span>{personal.location}</span>
            </li>
          </ul>

          <div className="flex gap-4 mt-8">
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="focus-ring p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-[color,border-color,transform] active:scale-90"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="focus-ring p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="focus-ring p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-10">
            <InteractiveHoverButton
              as="a"
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              text="Download Résumé"
              icon={<Download className="w-4 h-4" />}
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
              Name
            </label>
            <input id="name" type="text" name="name" required autoComplete="name" placeholder="Your name…" className={inputClass} />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
              Email
            </label>
            <input id="email" type="email" name="email" required autoComplete="email" inputMode="email" spellCheck={false} placeholder="you@example.com" className={inputClass} />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
              Subject
            </label>
            <input id="subject" type="text" name="subject" autoComplete="off" placeholder="What’s this about?" className={inputClass} />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
              Message
            </label>
            <textarea id="message" name="message" required placeholder="Your message…" className={`${inputClass} h-32 resize-y`} />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>

          <InteractiveHoverButton
            type="submit"
            disabled={state.submitting}
            text="Send Message"
            loadingText="Sending…"
            successText="Sent!"
            icon={<Send className="w-4 h-4" />}
            status={
              state.submitting
                ? "loading"
                : state.succeeded
                  ? "success"
                  : "idle"
            }
            className="w-full"
          />

          {isMounted && (
            <AnimatePresence mode="wait">
              {state.succeeded && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="text-green-500 text-sm text-center"
                >
                  Message sent. I'll get back to you soon.
                </motion.p>
              )}
              {!state.succeeded && state.errors && Object.keys(state.errors).length > 0 && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="text-red-500 text-sm text-center"
                >
                  Something went wrong. Email me directly at {personal.email}.
                </motion.p>
              )}
            </AnimatePresence>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
