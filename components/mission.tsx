"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { MissionBlock, MissionDocument } from "../lib/missions";
import { Footer, Header } from "./site";

function Block({ block }: { block: MissionBlock }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "bullets") return <ul>{block.items.map((item,index)=><li key={`${item.title || "item"}-${index}`}>{item.title && <b>{item.title}</b>} {item.text}</li>)}</ul>;
  if (block.type === "callout") return <aside className="missionCallout"><small>{block.label}</small><p>{block.text}</p></aside>;

  return <div className="missionCheckpoint">
    <p>{block.prompt}</p>
    <div>{block.options.map((option,index)=><button key={option} className={selected === index ? (index === block.correct ? "correct" : "incorrect") : ""} onClick={()=>setSelected(index)}><span>{String.fromCharCode(65+index)}.</span>{option}{selected === index && index === block.correct && <b>✓</b>}</button>)}</div>
    {selected !== null && <p className="missionFeedback" aria-live="polite">{selected === block.correct ? "Correct. Sustainable coverage starts with protected recovery time." : "Try again. More tools and more overtime do not repair an unsustainable operating model."}</p>}
  </div>;
}

export function MissionArticlePage({ mission }: { mission: MissionDocument }) {
  return <main className="missionPage">
    <Header/>
    <section className="missionStage" aria-label="Mission introduction"/>
    <section className="missionBody">
      <div className="missionGrid">
        <article className="missionArticle">
          <motion.header className="missionIntro" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.75}}>
            <h1>{mission.title}</h1>
            <p>{mission.intro}</p>
          </motion.header>
          <Image className="missionTitleRule" src="/images/mission/title-rule.svg" alt="" width={3400} height={135}/>
          <section className="missionLearning">
            <h2>Learning Goals:</h2>
            <p>By the end of this mission, you’ll be able to:</p>
            <ul>{mission.learningGoals.map(goal=><li key={goal}>{goal}</li>)}</ul>
          </section>
          <Image className="missionSectionRule" src="/images/mission/section-rule.svg" alt="" width={3400} height={45}/>
          <div className="missionFlow">{mission.sections.map((section,index)=><motion.section key={section.heading} className={section.accent ? "missionSection accent" : "missionSection"} initial={{opacity:0,y:26}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.55}}>
            <h2>{section.heading}</h2>
            {section.blocks.map((block,blockIndex)=><Block key={`${index}-${blockIndex}`} block={block}/>) }
          </motion.section>)}</div>
        </article>

        <aside className="missionNext">
          <div className="missionNextImage"><Image src={mission.next.image} alt="" fill sizes="(max-width: 900px) 100vw, 330px"/></div>
          <small>Next Mission</small>
          <div className="missionNextCopy"><h2>{mission.next.title}</h2><p>{mission.next.description}</p></div>
          <a href={mission.next.href}>Next Mission <Image src="/images/academy/carousel-arrow.svg" alt="" width={9} height={19}/></a>
        </aside>
      </div>
      <Link className="missionBack" href="/academy">← Return to Immortal Academy</Link>
    </section>
    <Footer/>
  </main>;
}
