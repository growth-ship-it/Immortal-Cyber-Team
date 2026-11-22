import { useEffect, useState } from "react";
import styles from "./home-agent-guide.module.css";

const topics = [
  ["Update a site", "Page edits", "Refresh the team page with the new roles. Keep each biography under 60 words.", "Move the service comparison above the contact form and preserve its anchor links."],
  ["Style a site", "Visual design", "Give the case studies a shared heading scale and align their image captions.", "Create a high-contrast focus style that works on both light and dark surfaces."],
  ["Build a new site", "New projects", "Draft a three-page site for a security conference with a schedule and speaker profiles.", "Build a landing page for an incident response workshop using the supplied brief."],
  ["Migrate a site", "Site migration", "Map the old resource URLs to their new pages and flag any missing destinations.", "Move the article archive into a collection, retaining authors and publication dates."],
  ["Adapt to mobile", "Responsive layout", "Stack the comparison columns on small screens and keep each plan name visible.", "Check the header at 360 pixels wide and adjust the menu so every link is reachable."],
  ["Create components", "Reusable elements", "Build an accessible FAQ accordion with keyboard controls.", "Turn the event details into a reusable component with date, venue and registration fields."],
  ["Improve search visibility", "Search and analytics", "Draft distinct titles and descriptions for each service page.", "Compare visits to the pricing page with clicks on its contact button."],
  ["Manage content", "CMS", "Create a case study collection with fields for the challenge, approach and outcome.", "Check the imported author records for duplicates before publishing."],
  ["Audit a site", "Quality checks", "List broken internal links and group them by the page that contains them.", "Review the keyboard path through the signup form and flag missing field labels."],
  ["Work with external agents", "Connected tools", "Read the supplied design brief and propose page changes for review.", "Compare the staging site with our content inventory and list missing pages."],
] as const;

const tools = [
  ["Skills", "Save a repeatable task, such as checking a page before launch, as a set of instructions."],
  ["Context", "Point the agent to the page or component you want to change."],
  ["Chats", "Keep feedback and revisions for one task in the same conversation."],
  ["Models", "Choose the model in your editor before starting a new task."],
  ["Mentions", "Reference a named page or collection to identify the right content."],
  ["References", "Attach a brief, screenshot or sample file to show what the result should look like."],
  ["Branches", "Preview edits on a separate branch before merging them into the live site."],
] as const;

const treatments = ["Original layout", "Apply the accent color", "Increase heading contrast"] as const;

function StyleDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === treatments.length - 1) setPlaying(false);
      else setStep(step + 1);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  function togglePlayback() {
    if (!playing && step === treatments.length - 1) setStep(0);
    setPlaying(!playing);
  }

  return <figure className={styles.demo}>
    <div className={styles.canvas} data-step={step}>
      <div className={styles.sample}>
        <span>Immortal Cyber Teams</span>
        <strong>Daily intelligence briefing</strong>
      </div>
    </div>
    <figcaption className={styles.controls}>
      <button type="button" onClick={togglePlayback}>{playing ? "Ⅱ Pause demo" : step === 2 ? "↻ Replay demo" : "▶ Play demo"}</button>
      <span aria-live="polite">{treatments[step]}</span>
    </figcaption>
  </figure>;
}

export function HomeAgentGuide() {
  const [feedback, setFeedback] = useState("");
  async function copy(prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setFeedback("Copied to clipboard: " + prompt);
    } catch {
      setFeedback("Highlight the prompt text and copy it manually.");
    }
  }

  return <section className={styles.section} id="agent-guide" aria-labelledby="agent-guide-heading">
    <header className={styles.hero}>
      <p>Website design guide</p>
      <h2 id="agent-guide-heading">AI agents for designing, updating, and improving sites</h2>
      <div><a href="#agent-topic-1">Explore the prompts ↓</a><a href="https://www.framer.com/agents/">Open Framer ↗</a></div>
    </header>
    <div className={styles.library}>
      <nav aria-label="Guide topics" className={styles.index}>
        {topics.map(([title], index) => <a key={title} href={`#agent-topic-${index + 1}`}>{title}</a>)}
        <a href="#agent-toolkit">Agent toolkit ↓</a>
      </nav>
      <div>{topics.map(([title, category, ...prompts], index) => <article key={title} id={`agent-topic-${index + 1}`} className={styles.topic}>
        <p>{category}</p><h3>{title}</h3>
        {category === "Visual design" && <StyleDemo/>}
        {prompts.map(prompt => <div className={styles.prompt} key={prompt}>
          <span>{prompt}</span>
          <button type="button" aria-label={`Copy prompt: ${prompt}`} onClick={() => copy(prompt)}>{feedback === "Copied to clipboard: " + prompt ? "Copied ✓" : "Copy"}</button>
        </div>)}
      </article>)}</div>
    </div>
    <section id="agent-toolkit" className={styles.toolkit}>
      <h2>Your toolkit for building with Agents</h2>
      <dl>{tools.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>
      <a href="https://www.framer.com/agents/">Explore Framer’s agent tools ↗</a>
    </section>
    <span role="status" className={styles.status}>{feedback}</span>
  </section>;
}
