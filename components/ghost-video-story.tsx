"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ghost-video-story.module.css";

export function GhostVideoStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstY = useTransform(scrollYProgress, [0, .18, .35, .5], ["70vh", "0vh", "0vh", "-70vh"]);
  const firstOpacity = useTransform(scrollYProgress, [0, .13, .38, .5], [0, 1, 1, 0]);
  const secondY = useTransform(scrollYProgress, [.44, .62, .82, 1], ["70vh", "0vh", "0vh", "-70vh"]);
  const secondOpacity = useTransform(scrollYProgress, [.44, .57, .86, 1], [0, 1, 1, 0]);

  function seekVideo() {
    const video = videoRef.current;
    if (!video || video.seeking || video.readyState < 1 || reducedMotion) return;
    if (Math.abs(video.currentTime - targetTime.current) > 1 / 24) video.currentTime = targetTime.current;
  }

  useMotionValueEvent(scrollYProgress, "change", progress => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    targetTime.current = progress * Math.max(0, video.duration - 1 / 24);
    seekVideo();
  });

  return <section ref={sectionRef} id="ghost-video-story" className={styles.story} aria-label="Ghost threat intelligence and breached account response">
    <div className={styles.stage}>
      <video ref={videoRef} className={styles.video} muted playsInline preload="metadata"
        src={reducedMotion ? undefined : "/videos/ghost-adjustable.mp4"}
        poster="/images/ghost-adjustable-poster.jpg" aria-hidden="true"
        onLoadedMetadata={event => {
          const video = event.currentTarget;
          video.pause();
          targetTime.current = scrollYProgress.get() * Math.max(0, video.duration - 1 / 24);
          seekVideo();
        }} onSeeked={seekVideo}/>
      <div className={styles.shade}/>
      <motion.article className={styles.first} style={reducedMotion ? undefined : { y: firstY, opacity: firstOpacity }}>
        <span className={styles.number}>01</span>
        <div><h2>Know what’s targeting you</h2><p>Ghost tracks threat actors, malware campaigns and emerging exploits, connecting global activity to your industry, technologies and suppliers.</p></div>
      </motion.article>
      <motion.article className={styles.second} style={reducedMotion ? undefined : { y: secondY, opacity: secondOpacity }}>
        <span className={styles.number}>02</span>
        <div><h2>Secure exposed accounts</h2><p>Ghost identifies leaked credentials and stealer malware exposures, helps secure breached accounts and shares the findings with your response team.</p></div>
      </motion.article>
    </div>
  </section>;
}
