import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./home-hero.module.css";

const partners = [
  ["superloop", "Superloop"],
  ["alliance-business-technologies", "Alliance Business Technologies"],
  ["logicalis-australia", "Logicalis Australia"],
  ["matrium-technologies", "Matrium Technologies"],
  ["olympus-technologies", "Olympus Technologies"],
  ["ethan-group", "Ethan Group"],
  ["hitachi-japan", "Hitachi Japan"],
  ["intelliworx", "Intelliworx"],
  ["athena-dynamics", "Athena Dynamics"],
  ["tecala", "Tecala"],
  ["2t-security", "2T Security"],
];

export function HomeHero({ background = "image" }: { background?: "image" | "video" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = background === "video";
  const Heading = isVideo ? "h1" : "h2";
  const headingId = isVideo ? "home-heading" : "home-image-heading";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const updatePlayback = () => {
      if (visible && !document.hidden && !reducedMotion.matches) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [background]);

  return <section id={isVideo ? "home-hero-1" : "home-hero-2"} className={`${styles.hero} ${isVideo ? styles.videoHero : ""}`} aria-labelledby={headingId}>
    <div className={styles.art} aria-hidden="true">
      <div className={styles.rings}>
        <span/><span/><span/><span/><span/><span/>
      </div>
      {isVideo ? <video ref={videoRef} className={styles.backgroundVideo} autoPlay muted loop playsInline
        preload="metadata" poster="/images/home-poster.jpg">
        <source src="/images/home-hero.mp4" type="video/mp4"/>
      </video> : <div className={styles.portraitFrame}>
        <Image src="/images/normal-ict-hero.webp" alt="" fill priority sizes="(max-width: 700px) 100vw, 700px" className={styles.portrait}/>
      </div>}
    </div>
    <div className={styles.copy}>
      <Heading id={headingId} className={isVideo ? styles.logoHeading : styles.title}>
        {isVideo ? <Image src="/images/home-hero-logo.svg" alt="Immortal Cyber Teams" width={430} height={150} priority/> : <>Your cyber team.<br/><span>Beyond human limits.</span></>}
      </Heading>
      {isVideo && <p className={styles.intro}>The Immortals track threat actors, reveal hidden assets, exploit vulnerabilities, triage security events, respond to breaches, and manage risk, to neutralize threats before they can emerge.</p>}
      <div className={styles.actions}>
        {isVideo ? <a className={`btn lightBtn ${styles.originalButton}`} href="https://console.immortals.co/">
          <img src="/images/talk-immortal-arrow.svg" width={18} height={18} alt=""/>Talk to an Immortal
        </a> : <>
          <a className="btn lightBtn" href="https://console.immortals.co/">Chat with an Immortal</a>
          <a className="btn" href="https://console.immortals.co/">Start Free Tier</a>
        </>}
      </div>
      <div className={styles.specialists}>
        <p>ALIGNING WITH THESE PARTNERSHIPS</p>
        <div className={styles.partnerWindow}>
          <div className={styles.partnerTrack}>
            <div className={styles.partnerLogos}>
              {partners.map(([slug, name]) => <Image key={slug} src={`/images/partners/${slug}.svg`} alt={name} width={140} height={50}/>)}
            </div>
            <div className={styles.partnerLogos} aria-hidden="true">
              {partners.map(([slug]) => <Image key={slug} src={`/images/partners/${slug}.svg`} alt="" width={140} height={50}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    {isVideo && <aside className={styles.isoBadge} aria-label="ISO 27001 Certified">
      <p>We are ISO<br/>27001 Certified</p>
      <Image src="/images/iso-27001.png" alt="" width={60} height={60}/>
    </aside>}
    <figure className={styles.dashboard}>
      <figcaption><span>IMMORTAL CONSOLE</span><span>Your team. One workspace.</span></figcaption>
      <Image src="/images/ghost-dashboard-preview.png" alt="Immortal console preview showing Ghost and the intelligence workspace" width={1769} height={851} sizes="(max-width: 700px) 96vw, 86vw" priority/>
    </figure>
  </section>;
}
