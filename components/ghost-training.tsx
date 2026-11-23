import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import styles from "./ghost-training.module.css";

const consoleUrl = "https://console.immortals.co/";
const learningTopics = [
  "Daily Intelligence Briefing",
  "Monitor Global Threat Actor Activities",
  "Dark Web Monitoring",
  "Monitor Third-Party Supplier Exposures",
  "Leaked Password Monitoring",
  "Stealer Malware Monitoring",
  "Secure Breached Accounts",
  "Track the Latest Vulnerabilities",
  "Track the Latest Exploits",
  "Cyber Threat Intelligence Feeds",
  "Dumpsite Data Leak Monitoring",
  "Create an Intelligence Report",
];

export function GhostTraining() {
  return <>
    <section id="ghost-certification" className={styles.certification} aria-labelledby="ghost-certification-heading">
      <div className={styles.certificationLayout}>
        <ScrollReveal className={styles.certificationCopy}>
          <h2 id="ghost-certification-heading">Certified Immortal<br/>Intelligence Specialist (CIIS)</h2>
          <p>Build your skills, grow your career and join the team as a Certified Immortal Intelligence Specialist (CIIS).</p>
        </ScrollReveal>
        <ScrollReveal className={styles.badge} delay={.12}>
          <Image src="/images/ghost-ciis-badge.svg" alt="Certified Immortal Intelligence Specialist badge" width={494} height={434}/>
        </ScrollReveal>
      </div>
    </section>

    <section id="ghost-training" className={styles.training} aria-labelledby="ghost-training-heading">
      <div className={styles.trainingLayout}>
        <ScrollReveal className={styles.trainingVisual}>
          <Image src="/images/ghost-training-group.webp" alt="Pandora, Ghost and Pulse of the Immortal Cyber Team" fill unoptimized sizes="(max-width: 800px) 100vw, 45vw"/>
        </ScrollReveal>
        <div className={styles.trainingCopy}>
          <ScrollReveal>
            <h2 id="ghost-training-heading">Immortal Intelligence Specialist Training</h2>
            <p>Earn Immortal Medals as you develop practical intelligence skills with Ghost.</p>
            <a className={`btn ${styles.login}`} href={consoleUrl}>Login</a>
          </ScrollReveal>
          <ul className={styles.topics}>
            {learningTopics.map(topic => <li key={topic}>
              <ScrollReveal><span className={styles.medal} aria-hidden="true"/><span>{topic}</span></ScrollReveal>
            </li>)}
          </ul>
          <ScrollReveal className={styles.trainingAction}>
            <p>Explore your Intelligence Dashboards with Ghost and keep the intelligence you need within reach.</p>
            <p>Begin your free Intelligence Specialist Training with Ghost.</p>
            <a className={`btn lightBtn ${styles.start}`} href={consoleUrl}>Start your Intelligence Specialist Training</a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </>;
}
