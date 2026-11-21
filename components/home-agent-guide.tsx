import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import styles from "./home-agent-guide.module.css";

type Specialist = { name: string; key: string; role: string; accent: string; capabilities: string[] };

const questions: Record<string, string[]> = {
  ghost: ["Which threat actors are targeting our industry?", "Summarise the latest supplier exposures."],
  spectre: ["Which findings from our last assessment should we fix first?", "Summarise the remediation work still open."],
  pulse: ["Which alerts need an analyst’s attention today?", "Summarise unusual sign-ins over the past week."],
  hex: ["Build a timeline from the incident evidence.", "Which systems still need containment?"],
  pandora: ["Which controls are missing audit evidence?", "Summarise the highest risks in our register."],
  link: ["Which cloud settings need review?", "List the assets missing endpoint coverage."],
};

export function HomeAgentGuide({ specialists, consoleUrl }: { specialists: [string, Specialist][]; consoleUrl: string }) {
  const [selected, select] = useState(0);
  const [notice, setNotice] = useState("");
  const [slug, agent] = specialists[selected];

  async function copy(question: string) {
    try {
      await navigator.clipboard.writeText(question);
      setNotice("Copied: " + question);
    } catch {
      setNotice("Select the question text to copy it.");
    }
  }

  return <section className={styles.section} id="agent-guide" aria-labelledby="agent-guide-heading">
    <div className={styles.inner}>
      <header className={styles.header}>
        <h2 id="agent-guide-heading">AI agents for threat intelligence, response and defense.</h2>
        <a className="btn lightBtn" href={consoleUrl}>Open the console</a>
      </header>
      <nav className={styles.choices} aria-label="Choose a specialist">
        {specialists.map(([path, member], index) => <button key={path} type="button" aria-pressed={selected === index}
          onClick={() => { select(index); setNotice(""); }}>{member.name}</button>)}
      </nav>
      <div className={styles.panel} style={{ "--agent-color": agent.accent } as CSSProperties}>
        <div className={styles.portrait}>
          <Image key={agent.key} src={`/images/${agent.key}.png`} alt={agent.name} fill sizes="(max-width: 700px) 94vw, 42vw"/>
        </div>
        <div className={styles.prompts}>
          <h3>{agent.role}</h3>
          <p>Try a question with {agent.name}.</p>
          {questions[agent.key].map(question => <div className={styles.question} key={question}>
            <span>{question}</span>
            <button type="button" onClick={() => copy(question)} aria-label={`Copy question: ${question}`}>Copy</button>
          </div>)}
          <span role="status" className={styles.notice}>{notice}</span>
          <Link href={`/${slug}`}>Meet {agent.name} →</Link>
        </div>
      </div>
      <div className={styles.toolkit}>
        <h2>Your toolkit for working with Immortal agents</h2>
        <div className={styles.tools}>{specialists.map(([path, member]) => <Link href={`/${path}`} key={path}>
          <h3>{member.capabilities[0]}</h3><span>{member.name} ↗</span>
        </Link>)}</div>
      </div>
    </div>
  </section>;
}
