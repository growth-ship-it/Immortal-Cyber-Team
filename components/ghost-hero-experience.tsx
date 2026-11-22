"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { GhostHeroVideo } from "./ghost-hero-video";
import { GhostPromptForm } from "./ghost-prompt-form";
import "./ghost-hero-experience.css";

function GhostTextReveal({ progress, start, children }: { progress: MotionValue<number>; start: number; children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const y = useTransform(progress, [start, start + 0.12], ["105%", "0%"]);
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);

  return <span className="ghostTextRevealMask">
    <motion.span className="ghostTextRevealLine" style={reducedMotion ? undefined : { y, opacity }}>{children}</motion.span>
  </span>;
}

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
  const dashboardOffset = useMotionValue(0);

  const morph = useTransform(scrollYProgress, (progress) => {
    const t = Math.min(1, Math.max(0, (progress - 0.06) / 0.36));
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

  const slideProgress = useTransform(scrollYProgress, [0.56, 0.95], [0, 1]);
  const dashboardX = useTransform(() => dashboardOffset.get() * slideProgress.get());
  const introOpacity = useTransform(scrollYProgress, [0.56, 0.74], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.56, 0.85], [48, 0]);

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
      const frame = slot.closest<HTMLElement>(".ghostDashboardFrame");
      dashboardOffset.set(frame ? frame.offsetWidth / 2 : 0);
      let slotX = 0;
      let slotY = 0;
      let element: HTMLElement | null = slot;
      while (element && element !== stage) {
        slotX += element.offsetLeft;
        slotY += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      originTop.set(originBounds.top - stageBounds.top);
      originWidth.set(originBounds.width);
      originHeight.set(originBounds.height);
      slotLeft.set(slotX);
      slotTop.set(slotY);
      slotWidth.set(slot.clientWidth);
      slotHeight.set(slot.clientHeight);
      slotRadius.set(parseFloat(getComputedStyle(slot).borderTopLeftRadius) || 0);
      setMeasured(true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(origin);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [originTop, originWidth, originHeight, slotLeft, slotTop, slotWidth, slotHeight, slotRadius, dashboardOffset]);

  return (
    <div ref={journeyRef} id="ghost-slide" className="ghostHeroJourney ghostHeroJourney--slide">
      <div ref={stageRef} className="ghostHeroStage" data-hero-active={heroActive || reducedMotion ? "true" : "false"}>
        <motion.div className="ghostRevealIntro" style={{ opacity: reducedMotion ? 1 : introOpacity, y: reducedMotion ? 0 : introY }}>
          <h2>
            <GhostTextReveal progress={scrollYProgress} start={0.6}>Meet Ghost.</GhostTextReveal>
            <GhostTextReveal progress={scrollYProgress} start={0.64}>See the threat.</GhostTextReveal>
            <GhostTextReveal progress={scrollYProgress} start={0.68}>Make your move.</GhostTextReveal>
          </h2>
          <p><GhostTextReveal progress={scrollYProgress} start={0.74}>Ghost turns global threat activity, exposed credentials and emerging exploits into intelligence your team can act on.</GhostTextReveal></p>
          <p><GhostTextReveal progress={scrollYProgress} start={0.8}>Get clear priorities, investigate what matters and move from a question to your next decision.</GhostTextReveal></p>
        </motion.div>
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
            <a className="ghostCloneShowreel" href="https://www.youtube.com/watch?v=8aQzmsR5av4" target="_blank" rel="noreferrer"><span>WATCH GHOST IN ACTION</span></a>
          </div>
          <div className="ghostCloneScroll">SCROLL TO EXPLORE</div>
        </motion.section>

        <motion.div className="ghostDashboardMotion" style={reducedMotion ? undefined : { x: dashboardX }}>
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
            <span className="ghostDashboardProfile">Profile</span>
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
        </motion.div>
      </div>
    </div>
  );
}
