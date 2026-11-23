"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import faqs from "./ghost-faq-data.json";
import styles from "./ghost-faq.module.css";
import { ScrollReveal } from "./scroll-reveal";

export function GhostFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return <section id="ghost-faq" className={styles.section} aria-labelledby="ghost-faq-heading">
    <div className={styles.inner}>
      <ScrollReveal className={styles.heading}>
        <h2 id="ghost-faq-heading">Frequently Asked Questions (FAQs)</h2>
      </ScrollReveal>
      <div className={styles.accordion}>
        {faqs.map(({ question, answer }, index) => <motion.article key={question} className={styles.item} data-scroll-reveal
          initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .2 }} transition={{ duration: reducedMotion ? 0 : .6 }}
          onPointerEnter={event => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.dataset.entry = event.clientY < bounds.top + bounds.height / 2 ? "top" : "bottom";
          }}>
          <h3>
            <button type="button" id={`ghost-faq-question-${index}`} aria-expanded={open === index}
              aria-controls={`ghost-faq-answer-${index}`}
              onClick={() => setOpen(open === index ? null : index)}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{question}</span>
              <img className={styles.arrow} src="/images/faq-arrow.svg" alt="" width={18} height={24} aria-hidden="true"/>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === index && <motion.div id={`ghost-faq-answer-${index}`} role="region"
              aria-labelledby={`ghost-faq-question-${index}`}
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .3 }}
              className={styles.answer}>
              <p>{answer}</p>
            </motion.div>}
          </AnimatePresence>
        </motion.article>)}
      </div>
    </div>
  </section>;
}
