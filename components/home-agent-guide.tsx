"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import workflowData from "./agent-workflows.json";
import styles from "./home-agent-guide.module.css";

type Workflow = {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  video: string;
  poster: string;
  groups: { title: string; items: { title: string; description: string }[] }[];
};

const workflows: Workflow[] = workflowData;

function ScrollStackPanel({ children, className, last = false }: { children: ReactNode; className: string; last?: boolean }) {
  const markerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [height, setHeight] = useState(480);
  const [top, setTop] = useState(120);
  const { scrollYProgress } = useScroll({
    target: markerRef,
    offset: [`start ${top}px`, `start ${top - height}px`],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, .95]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      setHeight(panel.offsetHeight);
      setTop(parseFloat(getComputedStyle(panel).top) || 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return <>
    <div ref={markerRef} className={styles.stackMarker} aria-hidden="true"/>
    <motion.div ref={panelRef} className={className} style={reducedMotion || last ? undefined : { scale }}>
      {children}
    </motion.div>
  </>;
}

function WorkflowBlock({ workflow }: { workflow: Workflow }) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLDivElement>(null);
  const videoVisible = useInView(videoRef);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!videoVisible) setPlaying(false);
  }, [videoVisible]);

  return <div id={`agent-${workflow.id}`} data-agent-workflow={workflow.id} className={styles.workflow}>
    <motion.aside className={styles.styleCard}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}
      transition={{ duration: .55 }}>
      <Image src={workflow.image} alt="" fill sizes="(max-width: 800px) 100vw, 400px"/>
      <div><span className={styles.name}>{workflow.name}</span><h3>{workflow.title}</h3><p>{workflow.description}</p></div>
    </motion.aside>
    <div className={styles.content}>
      <ScrollStackPanel className={styles.videoFrame}>
        <div ref={videoRef} className={styles.videoPlayer}>
          {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${workflow.video}?autoplay=1&rel=0&playsinline=1`}
            title={`${workflow.name}: ${workflow.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
            : <><Image src={workflow.poster} alt={`${workflow.name} video preview`} fill unoptimized sizes="(max-width: 800px) 100vw, 800px"/>
              <button type="button" className={styles.play} aria-label={`Play ${workflow.name} video`} onClick={() => setPlaying(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14l11-7z" fill="currentColor"/></svg>
              </button></>}
        </div>
      </ScrollStackPanel>
      {workflow.groups.map((group, index) => <ScrollStackPanel key={group.title} className={styles.promptCard}
        last={index === workflow.groups.length - 1}>
        <h4>{group.title}</h4>
        <div>{group.items.map(item => <div key={item.title} className={styles.prompt}>
          <h5>{item.title}</h5><p>{item.description}</p>
        </div>)}</div>
      </ScrollStackPanel>)}
    </div>
  </div>;
}

export function HomeAgentGuide() {
  const reducedMotion = useReducedMotion();
  return <section id="agent-guide" className={styles.section} aria-labelledby="agent-guide-heading">
    <div className={styles.inner}>
      <motion.header className={styles.intro} initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .65 }}>
        <h2 id="agent-guide-heading">Six Immortals.<br/> One cyber team.</h2>
      </motion.header>
      <nav className={styles.topics} aria-label="Immortal Cyber Team">
        {workflows.map(workflow => <a href={`#agent-${workflow.id}`} key={workflow.id}>
          <span className={styles.icon}>{workflow.name}</span><span>{workflow.title}</span>
        </a>)}
      </nav>
      {workflows.map(workflow => <WorkflowBlock key={workflow.id} workflow={workflow}/>)}
    </div>
  </section>;
}
