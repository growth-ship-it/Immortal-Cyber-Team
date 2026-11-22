"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

// The source's 4.75–8.25s segment turns from screen-left to screen-right.
// Its forward-facing pose is 1.5s into the prepared, all-keyframe clip.
const NEUTRAL_TIME = 1.5;
const FRAME_TIME = 1 / 24;
const VIDEO_SRC = "/videos/ghost-hero-scrub.mp4";
const POSTER_SRC = "/images/ghost-hero-poster.jpg";

export function GhostHeroVideo({ interactionRef }: { interactionRef?: RefObject<HTMLElement | null> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const hero = interactionRef?.current || video?.closest("section");
    if (!video || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let enabled = false;
    let visible = true;
    let disposed = false;
    let targetTime = NEUTRAL_TIME;
    let animationFrame: number | null = null;
    let lastStep = 0;

    const stop = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      lastStep = 0;
    };

    const queueSeek = () => {
      if (disposed || !enabled || !visible || document.hidden || animationFrame !== null) return;
      animationFrame = requestAnimationFrame(step);
    };

    function step(now: number) {
      animationFrame = null;
      if (!enabled || !visible || document.hidden || video!.readyState < 2) return;
      // Only one seek may be in flight. `seeked` resumes toward the latest target.
      if (video!.seeking) return;
      const difference = targetTime - video!.currentTime;
      if (Math.abs(difference) < FRAME_TIME / 2) {
        lastStep = 0;
        return;
      }
      const elapsed = lastStep ? Math.min(now - lastStep, 50) : 16;
      lastStep = now;
      const easedTime = video!.currentTime + difference * (1 - Math.exp(-elapsed / 70));
      video!.currentTime = Math.abs(difference) < FRAME_TIME ? targetTime : easedTime;
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || hero.dataset.heroActive === "false" || event.pointerType === "touch" || !Number.isFinite(video.duration)) return;
      const bounds = hero.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const end = Math.max(0, video.duration - FRAME_TIME);
      const center = Math.min(NEUTRAL_TIME, end);
      targetTime = x <= 0.5 ? x * 2 * center : center + (x - 0.5) * 2 * (end - center);
      queueSeek();
    };

    const playInline = () => {
      if (disposed || finePointer.matches || reducedMotion.matches || !visible || document.hidden) return;
      video.play().catch(() => { if (!disposed) setReady(false); });
    };
    const onPlaying = () => { if (!disposed) setReady(true); };
    const onMetadata = () => {
      if (!enabled) {
        playInline();
        return;
      }
      video.pause();
      targetTime = Math.min(NEUTRAL_TIME, Math.max(0, video.duration - FRAME_TIME));
      video.currentTime = targetTime;
    };
    const onSeeked = () => {
      if (disposed) return;
      if (enabled) setReady(true);
      queueSeek();
    };
    const onLoadedData = () => enabled ? queueSeek() : playInline();
    const onError = () => {
      enabled = false;
      stop();
      setReady(false);
    };
    const configure = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      video.loop = !finePointer.matches;
      video.muted = true;
      video.pause();
      stop();
      if (!reducedMotion.matches) {
        if (!video.getAttribute("src")) {
          video.src = VIDEO_SRC;
          video.load();
        } else if (video.readyState >= 1) {
          onMetadata();
        }
      } else {
        setReady(false);
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
        video.pause();
      } else if (enabled) queueSeek();
      else playInline();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (enabled) queueSeek();
        else playInline();
      } else {
        stop();
        video.pause();
      }
    });

    hero.addEventListener("pointermove", onPointerMove);
    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    video.addEventListener("playing", onPlaying);
    reducedMotion.addEventListener("change", configure);
    finePointer.addEventListener("change", configure);
    document.addEventListener("visibilitychange", onVisibilityChange);
    observer.observe(hero);
    configure();

    return () => {
      disposed = true;
      stop();
      video.pause();
      observer.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      video.removeEventListener("playing", onPlaying);
      reducedMotion.removeEventListener("change", configure);
      finePointer.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [interactionRef]);

  return <div className="ghostCloneHeroMedia">
    <Image src={POSTER_SRC} alt="Ghost, Immortal Intelligence Specialist" fill priority unoptimized />
    <video ref={videoRef} className={ready ? "ghostHeroVideo isReady" : "ghostHeroVideo"}
      muted playsInline preload="auto" poster={POSTER_SRC} aria-hidden="true" tabIndex={-1} />
  </div>;
}
