"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GhostHeroVideo } from "./ghost-hero-video";
import { GhostPromptForm } from "./ghost-prompt-form";
import "./ghost-hero-experience.css";

export function GhostHeroExperience({ action }: { action: string }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [measured, setMeasured] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ["start start", "end end"] });

  const originTop = useMotionValue(0);
  const originWidth = useMotionValue(0);
  const originHeight = useMotionValue(0);
  const slotLeft = useMotionValue(0);
  const slotTop = useMotionValue(0);
  const slotWidth = useMotionValue(0);
  const slotHeight = useMotionValue(0);
  const slotRadius = useMotionValue(0);

  const morph = useTransform(scrollYProgress, (progress) => {
    const t = Math.min(1, Math.max(0, (progress - 0.06) / 0.66));
    return t * t * (3 - 2 * t);
  });
  const left = useTransform(() => slotLeft.get() * morph.get());
  const top = useTransform(() => originTop.get() + (slotTop.get() - originTop.get()) * morph.get());
  const width = useTransform(() => originWidth.get() + (slotWidth.get() - originWidth.get()) * morph.get());
  const height = useTransform(() => originHeight.get() + (slotHeight.get() - originHeight.get()) * morph.get());
  const borderRadius = useTransform(() => slotRadius.get() * morph.get());
  const copyOpacity = useTransform(scrollYProgress, [0, 0.17], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.17], [0, -24]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  const shadeOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Only cross the interaction boundary once; scrolling does not re-render the page.
    setHeroActive((active) => active === (progress < 0.17) ? active : progress < 0.17);
  });

  useEffect(() => {
    const stage = stageRef.current;
    const origin = originRef.current;
    const slot = slotRef.current;
    if (!stage || !origin || !slot) return;

    const measure = () => {
      const stageBounds = stage.getBoundingClientRect();
      const originBounds = origin.getBoundingClientRect();
      const slotBounds = slot.getBoundingClientRect();
      originTop.set(originBounds.top - stageBounds.top);
      originWidth.set(originBounds.width);
      originHeight.set(originBounds.height);
      slotLeft.set(slotBounds.left - stageBounds.left);
      slotTop.set(slotBounds.top - stageBounds.top);
      slotWidth.set(slotBounds.width);
      slotHeight.set(slotBounds.height);
      slotRadius.set(parseFloat(getComputedStyle(slot).borderTopLeftRadius) || 0);
      setMeasured(true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(origin);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [originTop, originWidth, originHeight, slotLeft, slotTop, slotWidth, slotHeight, slotRadius]);

  return (
    <div ref={journeyRef} className="ghostHeroJourney">
      <div ref={stageRef} className="ghostHeroStage" data-hero-active={heroActive || reducedMotion ? "true" : "false"}>
        <div ref={originRef} className="ghostHeroMediaOrigin" aria-hidden="true" />
        <motion.section
          className="ghostCloneHero"
          aria-label="Ghost Intelligence Specialist"
          aria-hidden={!heroActive && !reducedMotion}
          inert={!heroActive && !reducedMotion ? true : undefined}
          style={{ opacity: reducedMotion ? 1 : copyOpacity, y: reducedMotion ? 0 : copyY }}
        >
          <div className="ghostCloneHeroCopy">
            <h1>GHOST</h1>
            <p className="ghostCloneHeroRole">Intelligence Specialist</p>
            <GhostPromptForm action={action} />
            <p className="ghostCloneHeroIntro">Ghost is the Immortal Cyber Team&apos;s Intelligence Specialist, turning live threats and exposures into clear, immediate action.</p>
            <a className="ghostCloneShowreel" href="https://www.youtube.com/watch?v=8aQzmsR5av4" target="_blank" rel="noreferrer"><span>WATCH GHOST<br />IN ACTION</span></a>
          </div>
          <div className="ghostCloneScroll">SCROLL TO EXPLORE</div>
        </motion.section>

        <motion.section
          className="ghostDashboardSection"
          aria-label="Ghost inside the Immortal console"
          aria-hidden={heroActive && !reducedMotion}
          style={{ opacity: reducedMotion ? 1 : dashboardOpacity }}
        >
          <div className="ghostDashboardFrame">
            <Image
              className="ghostDashboardArt"
              src="/images/ghost-dashboard-preview.png"
              alt="Immortal console preview with Ghost’s assistant panel, the specialist team and quick-start campaigns."
              width={1769}
              height={851}
              sizes="(max-width: 560px) calc(100vw - 24px), 90vw"
              loading="eager"
              unoptimized
              draggable={false}
            />
            <p className="ghostDashboardGreeting" aria-hidden="true">Good Evening,</p>
            <div ref={slotRef} className="ghostDashboardVideoSlot" aria-hidden="true" />
          </div>
        </motion.section>

        <motion.div
          className="ghostHeroSharedMedia"
          style={measured && !reducedMotion ? { left, top, width, height, borderRadius } : undefined}
        >
          <GhostHeroVideo interactionRef={stageRef} />
          <motion.div className="ghostHeroMediaShade" style={{ opacity: reducedMotion ? 1 : shadeOpacity }} />
        </motion.div>
      </div>
    </div>
  );
}
