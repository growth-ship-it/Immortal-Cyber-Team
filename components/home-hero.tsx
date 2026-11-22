import Image from "next/image";
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

export function HomeHero() {
  return <section className={styles.hero} aria-labelledby="home-heading">
    <div className={styles.art} aria-hidden="true">
      <div className={styles.rings}>
        <span/><span/><span/><span/><span/><span/>
      </div>
      <Image src="/images/ghost-home-hero.webp" alt="" fill priority sizes="100vw" className={styles.portrait}/>
    </div>
    <div className={styles.copy}>
      <h1 id="home-heading">Your cyber team.<br/><span>Beyond human limits.</span></h1>
      <div className={styles.actions}>
        <a className="btn lightBtn" href="https://console.immortals.co/">Chat with an Immortal</a>
        <a className="btn" href="https://console.immortals.co/">Start Free Tier</a>
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
    <figure className={styles.dashboard}>
      <figcaption><span>IMMORTAL CONSOLE</span><span>Your team. One workspace.</span></figcaption>
      <Image src="/images/ghost-dashboard-preview.png" alt="Immortal console preview showing Ghost and the intelligence workspace" width={1769} height={851} sizes="(max-width: 700px) 96vw, 86vw" priority/>
    </figure>
  </section>;
}
