"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./agents-section.module.css";
import { ScrollReveal } from "./scroll-reveal";

const consoleUrl = "https://console.immortals.co/";

// Copy and example questions from Introducing Ghost, 8 July 2026, pages 3–7.
const capabilities = [
  {
    id: "global-threat-intelligence",
    title: "Global Threat Intelligence",
    description: "Global threat activity, CTI feeds, attacker campaigns, malware trends, threat actor profiles, regional targeting, industry targeting, and emerging cyber risks.",
    tagline: "Stay informed of the latest threats to your business.",
    prompt: "Analyse the latest global threat activities.",
    response: "Ghost turns global threat intelligence into actionable insights your organisation can understand, prioritise, and automate.",
    outputs: ["Threat activity dashboards", "Threat actor summaries", "Regional and industry insights"],
  },
  {
    id: "credential-dark-web-intelligence",
    title: "Credential & Dark Web Intelligence",
    description: "Leaked credentials from third-party security breaches, stealer malware infections, exposed employee and customer accounts, threat actor dark web blog leaks, breached account response, and regular Intelligence reports.",
    tagline: "Find and secure breached accounts before attackers use them.",
    prompt: "Which accounts appear in stealer malware data?",
    response: "Ghost finds exposed credentials, secures breached accounts, and reports the dark web exposures attackers could use for access.",
    outputs: ["Leaked credential dashboards", "Stealer malware summaries", "Breached account response summaries"],
  },
  {
    id: "vulnerability-exploit-intelligence",
    title: "Vulnerability & Exploit Intelligence",
    description: "Latest vulnerabilities, exploit availability, weaponised code, affected technologies, attacker adoption, mapping vulnerabilities to organisational assets, and remediation priorities.",
    tagline: "Know which vulnerabilities attackers can weaponise across your estate.",
    prompt: "Map critical vulnerabilities to affected software and assets.",
    response: "Ghost shows which vulnerabilities are becoming weapons, which assets are exposed, and what should be prioritised first.",
    outputs: ["Asset exposure dashboards", "CVE priority summaries", "Remediation recommendations"],
  },
  {
    id: "supply-chain-intelligence",
    title: "Supply Chain Intelligence",
    description: "Supplier exposures, third-party breaches, supply chain risks, exposed domains, leaked credentials, vulnerability exposure, supplier monitoring, dashboards, and supply chain remediation reports.",
    tagline: "Monitor the third parties attackers may use to reach you.",
    prompt: "Analyse our latest supply chain findings.",
    response: "Ghost reveals the supply chain exposures, leaked credentials, and third-party risks attackers could use to reach your organisation.",
    outputs: ["Supply chain risk summaries", "Supplier exposure dashboards", "Third-party breach views", "Credential exposure reports", "Vulnerability exposure reports", "Dark web exposure reports", "Supply chain remediation reports", "Executive summaries"],
  },
] as const;

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

// Use the existing console still until each capability's final video is available.
function VideoPlaceholder({ title, index }: { title: string; index: number }) {
  return <div className={styles.media} role="img" aria-label={`${title} — video placeholder`}>
    <div className={styles.previewHeader} aria-hidden="true"><span>GHOST</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
    <div className={styles.previewScreen} aria-hidden="true"><Image src="/images/ghost-dashboard-preview.png" alt="" width={1769} height={851} sizes="(max-width: 800px) 90vw, 65vw" /></div>
    <span className={styles.placeholder}><svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="3" width="9" height="10" rx="2" stroke="currentColor"/><path d="m10 6 5-3v10l-5-3" stroke="currentColor"/></svg>Video placeholder</span>
  </div>;
}

function AgentConversation({ active }: { active: number }) {
  const reducedMotion = useReducedMotion();
  const capability = capabilities[active];
  return <motion.aside className={styles.conversation} aria-label="Example questions for Ghost" data-scroll-reveal
    initial={reducedMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: .15 }} transition={{ duration: reducedMotion ? 0 : .6 }}>
    <AnimatePresence mode="wait" initial={false}><motion.div key={active} className={styles.conversationContent} initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>
      <div className={styles.prompt}><span className={styles.questionLabel}>Example question</span>{capability.prompt}</div>
      <p className={styles.responseLabel}>Ghost helps your team</p>
      <motion.div className={styles.agentResult} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : .35, duration: .4 }}><p>{capability.response}</p><h4>Outputs</h4><ul>{capability.outputs.map(output => <li key={output}>{output}</li>)}</ul></motion.div>
    </motion.div></AnimatePresence>
    <a className={styles.composer} href={consoleUrl}>Chat with Ghost <Arrow/></a>
  </motion.aside>;
}

const supplyDetails = {
  Coverage: ["Supplier monitoring", "Partner exposure tracking", "Domain-based exposures", "Third-party breaches", "Leaked supplier credentials", "Supplier vulnerabilities", "Dark web leak activity", "Remediation tracking"],
  Outputs: capabilities[3].outputs,
  "Ask Ghost": ["Analyse our latest supply chain findings.", "Show suppliers with leaked passwords or stealer infections.", "Create a dashboard of critical third-party risks by domain.", "Generate supplier remediation reports for exposed risks."],
} as const;
type SupplyTab = keyof typeof supplyDetails;
const supplyTabs = Object.keys(supplyDetails) as SupplyTab[];

function SupplyChainPanel() {
  const [tab, setTab] = useState<SupplyTab>("Coverage");
  const capability = capabilities[3];
  return <ScrollReveal className={styles.supplyChain} id={`agents-${capability.id}`}>
    <div className={styles.supplyFeature}>
      <VideoPlaceholder title={capability.title} index={3}/>
      <div className={styles.supplyCopy}><h3>{capability.title}</h3><p>{capability.description}</p></div>
    </div>
    <div className={styles.detailPanel}>
      <div className={styles.detailHeading}>Supply chain intelligence</div>
      <div className={styles.toolTabs} role="tablist" aria-label="Supply chain capability details">{supplyTabs.map((name, index) => <button type="button" role="tab" id={`ghost-supply-tab-${index}`} aria-selected={tab === name} aria-controls="ghost-supply-details" tabIndex={tab === name ? 0 : -1} key={name} onClick={() => setTab(name)} onKeyDown={event => {
        const next = event.key === "ArrowRight" ? (index + 1) % supplyTabs.length : event.key === "ArrowLeft" ? (index + supplyTabs.length - 1) % supplyTabs.length : event.key === "Home" ? 0 : event.key === "End" ? supplyTabs.length - 1 : -1;
        if (next < 0) return;
        event.preventDefault();
        setTab(supplyTabs[next]);
        (event.currentTarget.parentElement?.children[next] as HTMLButtonElement)?.focus();
      }}>{name}</button>)}</div>
      <div className={styles.detailOutput} id="ghost-supply-details" role="tabpanel" aria-labelledby={`ghost-supply-tab-${supplyTabs.indexOf(tab)}`} tabIndex={0}>
        <p className={styles.detailIntro}>{capability.tagline}</p>
        <ul key={tab} className={styles.detailLines}>{supplyDetails[tab].map((line, i) => <li key={line} style={{ animationDelay: `${i * .08}s` }}>{line}</li>)}</ul>
      </div>
      <a className={styles.detailCta} href={consoleUrl}>Chat with Ghost <Arrow/></a>
    </div>
  </ScrollReveal>;
}

export function AgentsSection() {
  const [active, setActive] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingProgress } = useScroll({ target: headingRef, offset: ["start 92%", "start 35%"] });
  const backgroundOpacity = useTransform(headingProgress, [0, 1], [0, 1]);
  const featureRefs = useRef<Array<HTMLElement | null>>([]);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const target = window.innerHeight * .45;
      let nearest = 0;
      let distance = Infinity;
      featureRefs.current.forEach((element, i) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - target);
        if (nextDistance < distance) { nearest = i; distance = nextDistance; }
      });
      setActive(nearest);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return <section id="agents" className={styles.section} aria-labelledby="agents-heading">
    <div className={styles.inner}>
      <motion.div ref={headingRef} className={styles.heading}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ amount: .4, once: true }}>
        <motion.div className={styles.headingBackground} aria-hidden="true" style={{ opacity: reducedMotion ? 1 : backgroundOpacity }}/>
        <h2 id="agents-heading">
          {["Discover Ghost’s", "intelligence capabilities"].map((line, index) => <span className={styles.headingMask} key={line}>
            <motion.span className={styles.headingLine} data-scroll-reveal
              variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : index * .12, ease: [.2, .8, .2, 1] }}>
              {line}
            </motion.span>
          </span>)}
        </h2>
        <motion.a className={styles.startButton} href={consoleUrl} data-scroll-reveal
          variants={{ hidden: { y: 14, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: reducedMotion ? 0 : .5, delay: reducedMotion ? 0 : .25 }}>
          Chat with Ghost
        </motion.a>
      </motion.div>
      <div className={styles.layout}>
        <div className={styles.features}>{capabilities.slice(0, 3).map((capability, i) => <motion.article key={capability.id} id={`agents-${capability.id}`} ref={el => { featureRefs.current[i] = el; }} className={styles.feature} data-scroll-reveal initial={reducedMotion ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: .15, once: true }} transition={{ duration: .65, ease: [.2, .8, .2, 1] }}>
          <VideoPlaceholder title={capability.title} index={i}/>
          <ScrollReveal className={styles.featureFooter}><div><h3>{capability.title}</h3><p>{capability.description}</p></div><a href={consoleUrl}>Chat with Ghost <Arrow/></a></ScrollReveal>
        </motion.article>)}</div>
        <AgentConversation active={active}/>
      </div>
      <SupplyChainPanel/>
    </div>
  </section>;
}
