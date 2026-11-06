"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const consoleUrl = "https://console.immortals.co/";

const navRoles: Record<string, string> = {
  "security-operations": "Security Specialist",
};

const navAssets: Record<string, string> = {
  ghost: "/images/nav/ghost-nav.svg",
  spectre: "/images/nav/spectre-nav.svg",
  pulse: "/images/nav/pulse-nav.svg",
  hex: "/images/nav/hex-nav.webp",
  pandora: "/images/nav/pandora-nav.svg",
  link: "/images/nav/link-nav.webp",
};

function GhostRecoveryCard({item,sectionProgress,axis,index}:{item:string[];sectionProgress:any;axis:"x"|"y";index:number}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, .5, 1], [42, -18, -86]);
  const imageScale = useTransform(scrollYProgress, [0, .35, .72, 1], [1.12, 1.07, 1.025, 1]);
  const mobileStart = .1 + index * .1;
  const mobileImageY = useTransform(sectionProgress, [mobileStart, mobileStart + .14, mobileStart + .28], [42, -18, -86]);
  const mobileImageScale = useTransform(sectionProgress, [mobileStart, mobileStart + .14, mobileStart + .28], [1.12, 1.07, 1]);

  return (
    <article ref={cardRef}>
      <div className="ghostCloneRecoveryImage">
        <motion.div className="ghostCloneRecoveryImageInner" style={{y:axis === "x" ? mobileImageY : imageY,scale:axis === "x" ? mobileImageScale : imageScale}}>
          <Image src="/images/female-group.webp" alt="" fill sizes="(max-width: 900px) 82vw, 32vw"/>
        </motion.div>
      </div>
      <h3>{item[0]}</h3>
      <section><span>{item[1]}</span><p>{item[2]}</p></section>
    </article>
  );
}

export const specialists: Record<string, any> = {
  "intelligence-specialist": { name: "GHOST", role: "Intelligence Specialist", key: "ghost", accent: "#e554ff", intro: "Ghost is your Intelligence Specialist and founder of the Immortal Cyber Team. Rising from Baltimore's streets, she evolved from hacker to intelligence visionary.", briefing: "Join the Daily Intelligence Briefing", capabilities: ["Daily Intelligence Briefing", "Monitor Global Threat Actor Activities", "Dark Web Monitoring", "Monitor Third-Party Supplier Exposures", "Leaked Password Monitoring", "Stealer Malware Monitoring", "Secure Breached Accounts", "Track the Latest Vulnerabilities", "Track the Latest Exploits", "Cyber Threat Intelligence Feeds", "Dumpsite Data Leak Monitoring", "Create Intelligence Reports"] },
  "penetration-tester": { name: "SPECTRE", role: "Penetration Tester", key: "spectre", accent: "#cef069", intro: "Spectre is your elite Penetration Tester. He maps every exposed system, finds vulnerabilities, exploits weaknesses, and reports the path an attacker would take.", briefing: "Daily Penetration Test Briefing", capabilities: ["Daily Penetration Test Briefing", "Manage Penetration Tests", "External Penetration Testing", "Internal Penetration Testing", "Web Application Testing", "Cloud Security Testing", "Exploit Vulnerabilities", "Password Cracking", "Lateral Movement", "Create Penetration Test Reports"] },
  "security-operations": { name: "PULSE", role: "Security Operations Specialist", key: "pulse", accent: "#fff06a", intro: "Pulse is your Security Operations Specialist, continuously monitoring identities, endpoints, cloud systems and network signals to stop attackers the moment they surface.", briefing: "Daily Security Operations Briefing", capabilities: ["Daily Security Operations Briefing", "Endpoint Detection & Response", "Cloud Security Monitoring", "Identity Threat Detection", "Firewall and VPN Monitoring", "Security Event Triage", "Threat Hunting", "Malware Detection", "Escalate Anomalies", "Create Operations Reports"] },
  "incident-responder": { name: "HEX", role: "Incident Responder", key: "hex", accent: "#a99af4", intro: "Hex is your Incident Responder. He collects forensic evidence, analyses memory and logs, traces malware indicators and neutralises persistence before threats can spread.", briefing: "Daily Incident Response Briefing", capabilities: ["Daily Incident Response Briefing", "Evidence Collection and Analysis", "Memory Forensics", "Malware Analysis", "Log Investigation", "Network and Browser Analysis", "Compromise Assessment", "Contain Threats", "Eradicate Persistence", "Incident Response Reports"] },
  "grc-specialist": { name: "PANDORA", role: "GRC Specialist", key: "pandora", accent: "#64c8e8", intro: "Pandora is your GRC Specialist. She turns complex regulations into clear action, validates controls, assesses risk and automates evidence and reporting.", briefing: "Daily GRC Briefing", capabilities: ["Security Standard Gap Analysis", "Security Control Validation", "Third-Party Risk Assessments", "Compliance Monitoring", "Risk Register Management", "Policy Development", "Framework Mapping", "Audit Evidence Collection", "Executive Reporting", "Automated Documentation"] },
  "security-engineer": { name: "LINK", role: "Security Engineer", key: "link", accent: "#6ee7b7", intro: "Link is your Security Engineer. He connects the Immortals to your infrastructure, reviews configurations and automates remediation so nothing slips through the cracks.", briefing: "Daily Security Engineer Briefing", capabilities: ["Daily Security Engineer Briefing", "Discover Assets", "Deploy Endpoint Agents", "Integrate Security Solutions", "Cloud Configuration Review", "Identity Configuration Review", "Harden Systems", "Automate Remediation", "Manage Security Tools", "Engineering Reports"] },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<"immortals" | "company" | null>(null);
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
    setOpenDrop(null);
  }, [path]);

  const toggleDrop = (name: "immortals" | "company") => setOpenDrop(openDrop === name ? null : name);
  const closeMenus = () => setOpenDrop(null);

  return <header className="header">
    <Link href="/" className="brand"><Image src="/images/logo.svg" alt="Immortal Cyber Teams" width={150} height={46} priority /></Link>
    <button className={open ? "menu open" : "menu"} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span aria-hidden>{open ? "CLOSE" : "MENU"}</span><i/><i/></button>
    <nav className={open ? "nav open" : "nav"}>
      <div className={openDrop === "immortals" ? "navDrop isOpen" : "navDrop"} onMouseEnter={() => setOpenDrop("immortals")} onMouseLeave={closeMenus}>
        <button type="button" aria-haspopup="true" aria-expanded={openDrop === "immortals"} onClick={() => toggleDrop("immortals")}>Immortals <span className="navChevron" aria-hidden /></button>
        <div className="dropPanel immortalMenu" role="menu">
          <div className="navCardRow">
            {Object.entries(specialists).map(([slug, item]) => <Link key={slug} className="navSpecialistCard" href={`/${slug}`} role="menuitem" onClick={closeMenus}>
              <div className="navSpecialistCopy"><b>{item.name[0]+item.name.slice(1).toLowerCase()}</b><span>{navRoles[slug] || item.role}</span></div>
              <Image src={navAssets[item.key] || `/images/${item.key}.png`} alt="" width={381} height={309}/>
            </Link>)}
          </div>
        </div>
      </div>
      <Link className={path === "/training" ? "active" : ""} href="/training">Training</Link>
      <Link className={path === "/pricing" ? "active" : ""} href="/pricing">Pricing</Link>
      <div className={openDrop === "company" ? "navDrop isOpen" : "navDrop"} onMouseEnter={() => setOpenDrop("company")} onMouseLeave={closeMenus}>
        <button type="button" aria-haspopup="true" aria-expanded={openDrop === "company"} onClick={() => toggleDrop("company")}>Company <span className="navChevron" aria-hidden /></button>
        <div className="dropPanel companyMenu" role="menu">
          <div className="companyMega">
            <div className="companyFeature"><Image src="/images/nav/company-free-account.png" alt="" width={1200} height={1200}/><a href={consoleUrl} className="companyCreate">Create a Free Account</a></div>
            <i aria-hidden/>
            <div className="companyLinks">
              <div><Link href="/about-us" role="menuitem" onClick={closeMenus}>About Us</Link><p>Our mission, team, and the future of cyber workforce development.</p></div>
              <div><Link href="/partners" role="menuitem" onClick={closeMenus}>Partners</Link><p>Collaborate with us to build the next generation of cyber talent.</p></div>
              <div><a href="https://submit.immortals.co/" role="menuitem" onClick={closeMenus}>Contact Us</a><p>Get in touch with our team for support, partnerships, or inquiries.</p></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className="headerCtas"><a className="btn ghostBtn" href={consoleUrl}>Log In</a><a className="btn lightBtn" href={consoleUrl}>Start Free Tier</a></div>
  </header>;
}
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return <motion.div className={className} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-80px"}} transition={{duration:.75,delay,ease:[.2,.8,.2,1]}}>{children}</motion.div>;
}

function GlitchCorners() { return <div className="glitch" aria-hidden><i/><i/><i/><i/><b/><b/><b/><b/></div>; }

export function Footer() { return <footer className="footer-section"><div className="footerInner"><div className="footerImmortalTop"><div className="footerBrandBlock"><div><Link href="/" className="footerLogoLink"><Image src="/images/logo.svg" alt="Immortal Cyber Teams" width={134} height={44}/></Link><p>Imagine limitless resources, skills and capabilities with Immortal Cyber Teams.</p></div><Image className="footerBadge" src="/images/footer/footer-badge.png" alt="" width={125} height={126}/></div><div className="footerMenus"><div><h4>Immortals</h4>{Object.entries(specialists).map(([s,d])=><Link key={s} href={`/${s}`}>{d.role}</Link>)}</div><div><h4>Company</h4><Link href="/pricing">Pricing</Link><Link href="/about-us">About Us</Link><Link href="/terms-of-use">Terms of Use</Link><Link href="/privacy-policy">Privacy Policy</Link></div></div></div><div className="footerLine"/><div className="footerBottom"><p>© 2025 Immortal Cyber Teams. All rights reserved.</p><div className="footerSocial"><a href="https://x.com/immortalscyber" target="_blank" rel="noreferrer" aria-label="Immortal on X"><img src="/images/footer/x-icon.svg" alt=""/></a><a href="https://www.linkedin.com/company/immortal-cyber-teams/" target="_blank" rel="noreferrer" aria-label="Immortal on LinkedIn"><img src="/images/footer/linkedin-icon.svg" alt=""/></a><a href="https://www.facebook.com/profile.php?id=61575775053325" target="_blank" rel="noreferrer" aria-label="Immortal on Facebook"><img src="/images/footer/facebook-icon.svg" alt=""/></a><a href="https://www.youtube.com/@ImmortalCyberTeams" target="_blank" rel="noreferrer" aria-label="Immortal on YouTube"><img src="/images/footer/youtube-icon.svg" alt=""/></a></div></div></div></footer> }

function FinalCTA({ image="/images/team.webp" }: {image?: string}) { return <section className="finalCta"><div><Reveal><h2>Imagine Limitless Cyber Defence with the Immortal Cyber Team on Your Side.</h2><a className="btn lightBtn" href={consoleUrl}>Create Free Account</a></Reveal></div><Image src={image} alt="Immortal Cyber Team" fill sizes="100vw"/></section> }

const cards = Object.entries(specialists);
export function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress,[0,.12],[0,90]);
  return <main><Header/><section className="homeHero"><motion.div className="heroBg" style={{y:heroY}}><video autoPlay muted loop playsInline poster="/images/home-poster.jpg"><source src="/images/home-hero.mp4" type="video/mp4"/></video></motion.div><motion.div className="homeHeroContent" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:1.1,ease:[.2,.8,.2,1]}}><Image src="/images/logo.svg" alt="Immortal Cyber Teams" width={430} height={150}/><p>The Immortals track threat actors, reveal hidden assets, exploit vulnerabilities, triage security events, respond to breaches, and manage risk, to neutralize threats before they can emerge.</p><a className="btn lightBtn" href={consoleUrl}>Talk to an Immortal</a></motion.div><div className="iso">We are ISO<br/><b>27001 Certified</b></div></section>
  <section className="whiteStatement"><GlitchCorners/><Reveal><h2>Traditional cyber security has lost the war.<br/><span>We have changed the battlefield.</span></h2></Reveal></section>
  <section className="imageStatement"><Image src="/images/team.webp" alt="Immortal city" fill sizes="100vw"/><div className="shade"/><div className="statementGrid">{[["The Talent Gap is Exploding","4 million cybersecurity jobs are unfilled while threat-actor groups multiply - leaving organizations exposed and unprepared."],["The Cost of Failure is Devastating","Single breaches now cost over $100M, pushing global cybercrime losses toward $10.5 Trillion annually."],["Traditional Defenses Can’t Keep Up","Immortal Cyber Teams deliver superhuman speed, intelligence, and 24/7 response - without hiring delays or resource limits."]].map((x,i)=><Reveal key={x[0]} delay={i*.12}><h3>{x[0]}</h3><p>{x[1]}</p></Reveal>)}</div></section>
  <section className="darkIntro"><Reveal><h2>Imagine a Limitless Cybersecurity Team.<br/><span>Available within Seconds.</span></h2><p>The Immortal cyber specialists amplify your team's reach, eliminate blind spots, and unleash human potential — with the precision and endurance only AI can deliver.</p></Reveal></section>
  <section className="teamRail">{cards.map(([slug,d])=><motion.article key={slug} whileHover={{y:-10}} transition={{duration:.25}}><Link href={`/${slug}`}><div className="cardImage"><Image src={`/images/${d.key}.png`} alt={d.name} fill sizes="(max-width: 700px) 80vw, 25vw"/></div><h3 style={{color:d.accent}}>{d.name}</h3><h4>{d.role}</h4><p>{d.intro}</p><span className="learn" style={{borderColor:d.accent}}>Learn More →</span></Link></motion.article>)}</section>
  <section className="darkIntro defense"><GlitchCorners/><Reveal><h2>24/7 Cyber Defense.<br/><span>Zero Hiring Needs.</span></h2></Reveal><div className="threeCols">{[["Unified Defense, Real-Time Adaptation","Immortal Cyber Teams constantly share intelligence between themselves and with your staff — creating a living, evolving defense."],["Expert Insights, Instantly Available","From executive-ready summaries to deep technical evidence, receive the precise information your business needs."],["Always-On Protection, No Extra Headcount","While your people rest, the Immortals maintain relentless 24/7 vigilance without scaling human teams."]].map((x,i)=><Reveal key={x[0]} delay={i*.1}><h3>{x[0]}</h3><p>{x[1]}</p></Reveal>)}</div></section>
  <section className="linkFeature"><Image src="/images/link.png" alt="Link security engineer" fill sizes="100vw"/><div className="linkCopy"><Reveal><h2>Integrate your security with Link — the Immortal Security Engineer</h2><p>Let Link guide the way. By connecting Immortals with your infrastructure, he ensures smooth integrations, tight configurations, and automated processes.</p><a className="btn lightBtn" href={consoleUrl}>Start Free Tier</a></Reveal></div></section>
  <section className="trainingStrip"><Reveal><small>IMMORTAL TRAINING</small><h2>Master Cybersecurity.</h2><p>Level up your skills through gamified, real-world scenarios. Learn directly from each Immortal Specialist and earn Immortal Medals as you progress.</p><Link className="textLink" href="/training">Explore training →</Link></Reveal></section>
  <FinalCTA/><Footer/></main>;
}

export function SpecialistPage({slug}:{slug:string}) {
  const data = specialists[slug];
  if (slug === "intelligence-specialist") return <GhostPage data={data} />;
  return <main style={{"--accent":data.accent} as any}><Header/><section className="specialistHero"><motion.div className="specialistImage" initial={{scale:1.08,filter:"blur(8px)"}} animate={{scale:1,filter:"blur(0px)"}} transition={{duration:1.2}}><Image src={`/images/${data.key}.png`} alt={`${data.name} ${data.role}`} fill priority sizes="100vw"/></motion.div><div className="dots">{data.capabilities.map((_:any,i:number)=><i key={i}/>)}</div><motion.div className="specialistTitle" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.45,duration:.75}}><h1>{data.name}</h1><h2>{data.role}</h2><div className="chat">Chat with {data.name[0]+data.name.slice(1).toLowerCase()} <span>◉</span></div><a href={consoleUrl} className="brief">⊙　{data.briefing}</a></motion.div></section>
  <section className="who"><Reveal><small>WHO IS {data.name}</small><h2>Your {data.role} is here.</h2><p>{data.intro}</p><a className="btn accentBtn" href={consoleUrl}>Chat with {data.name[0]+data.name.slice(1).toLowerCase()}</a></Reveal></section>
  <section className="capIntro"><Reveal><small>CAPABILITIES</small><h2>Discover {data.name[0]+data.name.slice(1).toLowerCase()}’s<br/><span>{data.role} Capabilities</span></h2><p>Exceptional skills amplified by an unmatched cyber arsenal, available the moment your team needs them.</p></Reveal></section>
  <section className="capabilities">{data.capabilities.map((cap:string,i:number)=><Reveal key={cap} className="capability"><div className="capNo">{String(i+1).padStart(2,"0")}</div><div><small>CAPABILITY</small><h3>{cap}</h3><p>{cap} gives your team immediate, always-on coverage. Ask {data.name[0]+data.name.slice(1).toLowerCase()} to analyse the latest evidence, explain the risk in plain language, and recommend the next action.</p><a href={consoleUrl}>Open this capability ↗</a></div><motion.div className="orb" whileHover={{scale:1.12,rotate:10}}/></Reveal>)}</section>
  <section className="cert"><Reveal><small>CERTIFIED IMMORTAL</small><h2>{data.role}</h2><p>Progress your career, expand your skills, and officially join the team as a Certified Immortal {data.role}.</p><Link className="btn accentBtn" href="/training">Start Training</Link></Reveal></section>
  <FinalCTA image={data.key === "ghost" || data.key === "pulse" || data.key === "pandora" ? "/images/female-group.webp" : "/images/male-group.webp"}/><Footer/></main>
}

const ghostAreas = [
  { id:"global", number:"01", label:"Global Threat Intelligence", kicker:"Stay informed of the latest threats to your business.", summary:"Track CTI feeds, threat actors, malware, vulnerabilities, exploits and campaigns across the global threat landscape.", actions:["Analyse the latest global threat activities.","Provide details of threat actor campaigns.","What are the latest ransomware campaigns?"], outputs:["Threat activity dashboards","CTI feed integrations","Threat actor summaries","Regional and industry insights"] },
  { id:"dark", number:"02", label:"Credential & Dark Web Intelligence", kicker:"Find and secure breached accounts before attackers use them.", summary:"Reveal leaked credentials, stealer malware, exposed customer accounts and dark web activity that could create a direct path into your business.", actions:["Show leaked credentials from third-party breaches.","Which accounts appear in stealer malware data?","Summarise breached accounts secured this week."], outputs:["Leaked credential dashboards","Stealer malware summaries","Dark web exposure views","Breached account response summaries"] },
  { id:"vuln", number:"03", label:"Vulnerability & Exploit Intelligence", kicker:"Know which vulnerabilities attackers can weaponise across your estate.", summary:"Connect newly disclosed vulnerabilities and exploit activity to the technologies, suppliers and assets that matter to your organisation.", actions:["Analyse vulnerabilities affecting our technologies.","Show vulnerabilities with available public exploits.","Which latest exploits should we prioritise first?"], outputs:["Vulnerability intelligence views","Asset exposure dashboards","CVE priority summaries","Remediation recommendations"] },
  { id:"supply", number:"04", label:"Supply Chain Intelligence", kicker:"Monitor the third parties attackers may use to reach you.", summary:"Understand supplier, partner and third-party exposures before a breach becomes your problem.", actions:["Analyse our latest supply chain findings.","Show suppliers with leaked passwords or stealer infections.","Generate supplier remediation reports."], outputs:["Supply chain risk summaries","Third-party breach views","Credential exposure reports","Executive summaries"] },
];

function GhostPage({data}:{data:any}) {
  const [infoRailTravel, setInfoRailTravel] = useState(0);
  const [infoRailAxis, setInfoRailAxis] = useState<"x" | "y">("y");
  const [perfectCompact, setPerfectCompact] = useState(false);
  const statementRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLElement | null>(null);
  const therapyRef = useRef<HTMLElement | null>(null);
  const perfectRef = useRef<HTMLElement | null>(null);
  const infoRailRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: statementProgress } = useScroll({ target: statementRef, offset: ["start start", "end start"] });
  const { scrollYProgress: infoProgress } = useScroll({ target: infoRef, offset: ["start start", "end start"] });
  const { scrollYProgress: therapyProgress } = useScroll({ target: therapyRef, offset: ["start start", "end end"] });
  const { scrollYProgress: perfectProgress } = useScroll({ target: perfectRef, offset: ["start start", "end end"] });
  const statementSurfaceY = useTransform(statementProgress, [0, .86, 1], ["0vh", "0vh", "-8vh"]);
  const statementSurfaceScale = useTransform(statementProgress, [0, .86, 1], [1, 1, .985]);
  const statementSurfaceOpacity = useTransform(statementProgress, [0, .9, 1], [1, 1, .7]);
  const statementImageScale = useTransform(statementProgress, [0, .5, 1], [1.04, 1, 1.03]);
  const statementImageY = useTransform(statementProgress, [0, 1], [0, -260]);
  const statementShadeOpacity = useTransform(statementProgress, [0, .2, .72, 1], [.62, .82, .82, .68]);
  const statementFirstY = useTransform(statementProgress, [0, .1, .18], ["0%", "-100%", "-100%"]);
  const statementFirstOpacity = useTransform(statementProgress, [0, .08, .16], [1, .35, 0]);
  const statementSecondY = useTransform(statementProgress, [0, .08, .2], ["100%", "100%", "0%"]);
  const statementSecondOpacity = useTransform(statementProgress, [0, .1, .2], [0, 0, 1]);
  const statementSecondYLate = useTransform(statementProgress, [0, .11, .23], ["100%", "100%", "0%"]);
  const statementSecondOpacityLate = useTransform(statementProgress, [0, .13, .23], [0, 0, 1]);
  const infoSurfaceY = useTransform(infoProgress, [0, .08, .9, 1], ["8vh", "0vh", "0vh", "-5vh"]);
  const infoSurfaceOpacity = useTransform(infoProgress, [0, .08, .92, 1], [.75, 1, 1, .65]);
  const infoRailOffset = useTransform(infoProgress, [0, .14, .84, 1], [0, 0, -infoRailTravel, -infoRailTravel]);
  const infoProgressScale = useTransform(infoProgress, [.14, .84], ["14.285%", "100%"]);
  const therapyFirstY = useTransform(therapyProgress, [0, .22, .43, .58], ["500%", "0%", "0%", "-260%"]);
  const therapyFirstOpacity = useTransform(therapyProgress, [0, .18, .46, .58], [0, 1, 1, 0]);
  const therapySecondY = useTransform(therapyProgress, [.32, .52, .76, .92], ["500%", "0%", "0%", "-260%"]);
  const therapySecondOpacity = useTransform(therapyProgress, [.32, .5, .78, .92], [0, 1, 1, 0]);
  const therapyVideoScale = useTransform(therapyProgress, [0, 1], [1.06, 1]);
  const perfectBgY = useTransform(perfectProgress, [0, 1], ["20%", "-20%"]);
  const perfectWordScale = useTransform(perfectProgress, [0, .4], [1, perfectCompact ? 1 : .41]);
  const perfectLeftX = useTransform(perfectProgress, [0, .4], ["0vw", perfectCompact ? "-72vw" : "-30.3vw"]);
  const perfectRightX = useTransform(perfectProgress, [0, .4], ["0vw", perfectCompact ? "72vw" : "32.3vw"]);
  const perfectCardY = useTransform(perfectProgress, [0, .12, .62, 1], ["200%", "200%", perfectCompact ? "-45%" : "7%", perfectCompact ? "-45%" : "7%"]);
  useEffect(() => {
    const updateRailTravel = () => {
      const rail = infoRailRef.current;
      if (!rail) return;
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
      setPerfectCompact(window.matchMedia("(max-width: 768px)").matches);
      setInfoRailAxis(isDesktop ? "y" : "x");
      setInfoRailTravel(Math.max(0, isDesktop ? 0 : rail.scrollWidth - window.innerWidth));
    };
    requestAnimationFrame(updateRailTravel);
    window.addEventListener("resize", updateRailTravel);
    return () => window.removeEventListener("resize", updateRailTravel);
  }, []);

  const recoveryBlocks = [
    ["Threat actor tracking", "01", "Follow campaigns, malware families and attacker movement before they become incidents."],
    ["Credential exposure", "02", "Find leaked passwords, stealer infections and breached accounts while there is still time to respond."],
    ["Exploit awareness", "03", "Connect new CVEs and active exploit activity to the technologies your business actually uses."],
    ["Supplier risk", "04", "Monitor third parties and partners for the exposures attackers use as shortcuts."],
    ["Executive clarity", "05", "Turn noisy evidence into briefings leaders can understand and teams can act on."],
    ["Always-on coverage", "06", "Keep intelligence moving after hours without burning out your analysts."],
    ["Action reports", "07", "Create focused reports that explain risk, priority and the next move."],
  ];
  const homeDesign = [
    ["01", "Minimal footprint", "Deploy Ghost from the Immortal console without a hiring cycle or months of tooling work."],
    ["02", "Plug & Play intelligence", "Start with Ghost's daily briefing, then expand into credentials, exploits and suppliers."],
    ["03", "Low analyst load", "Let Ghost handle repetitive signal review so human teams can focus on decisions."],
    ["04", "Discreet presence", "Ghost works quietly in the background and surfaces only what needs attention."],
    ["05", "Flexible comfort", "Move from executive summaries to deep technical evidence whenever the moment demands it."],
  ];
  const comparisonRows = [
    ["Warm-up time", "Instant briefing and live context", "Manual collection and delayed review", "Separate tools and analyst queues"],
    ["Signal humidity", "Threats, credentials, exploits and suppliers in one picture", "Partial internal telemetry", "External feeds without business context"],
    ["Aromatherapy", "Action prompts and explainable next steps", "Raw alerts and open tickets", "Reports that arrive after the pressure has passed"],
    ["Space & mobility", "Available anywhere your team opens the console", "Requires staffing, shifts and handover", "Requires integration work and extra process"],
  ];
  const proofPoints = [
    "Tracks global threat activity continuously and turns it into a daily intelligence rhythm.",
    "Connects leaked credential exposure to the accounts and suppliers your team needs to secure.",
    "Prioritises vulnerabilities by exploit activity and relevance instead of headline noise.",
  ];
  const ghostTestimonials = [
    ["Security lead", "Ghost gives us the missing outside view. We see exposed credentials, exploit movement and supplier issues in one place before they turn into an emergency."],
    ["Risk manager", "The best part is the clarity. Ghost explains what matters, who is affected and what the business should do next."],
    ["SOC analyst", "It feels like having a senior intelligence analyst watching the horizon while the team handles the live queue."],
  ];

  return <main id="top" className="ghostClonePage" style={{"--accent":data.accent} as any}>
    <Header/>
    <div className="ghostCloneHeroFrame">
      <section className="ghostCloneHero" aria-label="Ghost Intelligence Specialist">
        <div className="ghostCloneHeroMedia">
          <Image src="/images/ghost.png" alt="Ghost, Immortal Intelligence Specialist" fill priority sizes="100vw"/>
        </div>
        <div className="ghostCloneHeroCopy">
          <h1>Relieve stress<br/>at home</h1>
          <a className="btn lightBtn ghostCloneHeroAction" href={consoleUrl}>Choose Relaxation</a>
          <a className="ghostCloneShowreel" href="#ghost-clone-signal">Discover our showreel'26</a>
        </div>
        <div className="ghostCloneScroll">SCROLL TO EXPLORE</div>
      </section>
    </div>

    <motion.section ref={statementRef} className="ghostCloneStatement" aria-label="Ghost recovery statement">
      <motion.div className="ghostCloneStatementSticky" style={{y:statementSurfaceY,scale:statementSurfaceScale,opacity:statementSurfaceOpacity}}>
        <motion.div className="ghostCloneStatementMedia" style={{scale:statementImageScale,y:statementImageY}}>
          <Image src="/images/female-group.webp" alt="" fill sizes="100vw"/>
        </motion.div>
        <motion.div className="ghostCloneStatementShade" style={{opacity:statementShadeOpacity}}/>
        <div className="ghostCloneStatementCopy">
          <h2 data-split="heading" aria-label="Modern security leaves little room for slow intelligence">
            <span className="ghostCloneLineParent" aria-hidden="true">
              <motion.span className="ghostCloneLineChild" style={{y:statementFirstY,opacity:statementFirstOpacity}}>Modern security leaves little room for <span>slow intelligence</span></motion.span>
            </span>
          </h2>
          <h2 data-split="heading" aria-label="Ghost is here to make early warning possible">
            <span className="ghostCloneLineParent" aria-hidden="true">
              <motion.span className="ghostCloneLineChild" style={{y:statementSecondY,opacity:statementSecondOpacity}}>Ghost is here to make early warning</motion.span>
            </span>
            <span className="ghostCloneLineParent" aria-hidden="true">
              <motion.span className="ghostCloneLineChild" style={{y:statementSecondYLate,opacity:statementSecondOpacityLate}}>possible</motion.span>
            </span>
          </h2>
        </div>
      </motion.div>
    </motion.section>

    <motion.section ref={infoRef} id="ghost-clone-signal" className="ghostCloneInfo">
      <motion.div className="ghostCloneInfoSticky" style={{y:infoRailAxis === "x" ? infoSurfaceY : 0,opacity:infoRailAxis === "x" ? infoSurfaceOpacity : 1}}>
        <div className="ghostCloneInfoIntro">
          <p>Improve security while your team keeps moving</p>
          <h2>Ghost uses live intelligence to reset risk, focus and response</h2>
          <a className="ghostCloneInfoButton" href={consoleUrl}>Get a briefing</a>
        </div>
        <div className="ghostCloneRecoveryHead">
          <p><span>01</span><span>/</span><span>07</span></p>
          <div><motion.i style={{width:infoProgressScale}}/></div>
        </div>
        <div className="ghostCloneRecoveryViewport">
          <motion.div ref={infoRailRef} className="ghostCloneRecovery" style={{x:infoRailAxis === "x" ? infoRailOffset : 0}}>
            {recoveryBlocks.map((item,index)=><GhostRecoveryCard key={item[0]} item={item} index={index} axis={infoRailAxis} sectionProgress={infoProgress}/>)}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>

    <motion.section ref={therapyRef} className="ghostCloneTherapy" aria-label="Ghost immediate action">
      <div className="ghostCloneTherapyTop">
        <p><span className="ghostCloneLineParent"><span className="ghostCloneLineChild">Improve security while relaxing the team</span></span></p>
        <h2>
          <span className="ghostCloneLineParent"><span className="ghostCloneLineChild">Safe intelligence</span></span>
          <span className="ghostCloneLineParent"><span className="ghostCloneLineChild">with immediate action</span></span>
        </h2>
      </div>
      <div className="ghostCloneTherapyPin">
        <motion.video className="ghostCloneTherapyVideo" style={{scale:therapyVideoScale}} autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/videos/fitosauna-sauna-back.webm" type="video/webm"/>
        </motion.video>
        <div className="ghostCloneTherapyShade"/>
        <motion.article className="ghostCloneTherapyCallout ghostCloneTherapyCalloutLeft" style={{y:therapyFirstY,opacity:therapyFirstOpacity}}>
          <span>01</span>
          <div><h3>Adjustable depth</h3><p>Move from a concise executive briefing to deep evidence, indicators, assets and supplier context.</p></div>
        </motion.article>
        <motion.article className="ghostCloneTherapyCallout ghostCloneTherapyCalloutRight" style={{y:therapySecondY,opacity:therapySecondOpacity}}>
          <span>02</span>
          <div><h3>Breathe easy</h3><p>Ghost keeps the signal clear so teams can avoid panic, noise and heat-induced decision fatigue.</p></div>
        </motion.article>
      </div>
    </motion.section>

    <section className="ghostCloneDesigned">
      <div className="ghostCloneDesignedHead">
        <h5>Designed for security teams</h5>
        <h5>Designed for security teams</h5>
      </div>
      <div className="ghostCloneSpecGrid">
        {homeDesign.map((item)=><article key={item[0]}>
          <h5>{item[0]} {item[1]}</h5>
          <h3>{item[2]}</h3>
        </article>)}
      </div>
    </section>

    <section className="ghostCloneCompare">
      <div className="ghostCloneCompareHead">
        <h2>Why Ghost intelligence stands out</h2>
        <a href={consoleUrl}>Learn more about Ghost</a>
      </div>
      <div className="ghostCloneTable" role="table" aria-label="Ghost comparison table">
        <div className="ghostCloneTableHead" role="row"><div>Features</div><div>Ghost</div><div>Traditional SOC</div><div>Point tools</div></div>
        {comparisonRows.map((row)=><div className="ghostCloneTableRow" role="row" key={row[0]}>{row.map((cell)=><div key={cell}>{cell}</div>)}</div>)}
      </div>
    </section>

    <section className="ghostCloneUse">
      <div>
        <h2>Created for long-term use</h2>
        <p>Ghost is suitable for daily intelligence practice and designed to support security, risk and executive teams with clear, repeatable outputs.</p>
      </div>
      <div className="ghostCloneUseGrid">
        {proofPoints.map((point,index)=><article key={point}><span>{String(index+1).padStart(2,"0")}</span><p>{point}</p></article>)}
      </div>
    </section>

    <section className="ghostCloneTestimonials">
      <div className="ghostCloneTestImage"><Image src="/images/ghost.png" alt="" fill sizes="(max-width: 900px) 100vw, 42vw"/></div>
      <div className="ghostCloneTestCopy">
        <p>PEOPLE WHO CHOSE GHOST</p>
        <h3>{ghostTestimonials[0][1]}</h3>
        <h5>{ghostTestimonials[0][0]}</h5>
        <span>01 / 03</span>
      </div>
    </section>

    <motion.section ref={perfectRef} className="ghostClonePerfect" aria-label="Choose your perfect Ghost">
      <div className="ghostClonePerfectPin">
      <motion.div className="ghostClonePerfectBgWrap" style={{y:perfectBgY}}>
        <Image className="ghostClonePerfectBg" src="/images/fitosauna-clone/choose-perfect-bg.jpg" alt="" fill sizes="100vw"/>
      </motion.div>
      <div className="ghostClonePerfectWords" aria-hidden="true">
        <motion.div style={{x:perfectLeftX,scale:perfectWordScale}}><h2>Choose your</h2></motion.div>
        <motion.div style={{x:perfectRightX,scale:perfectWordScale}}><h2>perfect specialist</h2></motion.div>
      </div>
      <motion.div className="ghostClonePerfectCard" style={{y:perfectCardY}}>
        <h6>See how it works</h6>
        <h3>Try Ghost risk-free for 30 days</h3>
        <img src="/images/fitosauna-clone/risk-free-badge.svg" alt="" aria-hidden="true"/>
        <div className="ghostClonePerfectFeatures">
          <h5>Changed your mind? Switch the brief</h5>
          <h5>30-day intelligence guarantee</h5>
          <h5>Full context and clear next steps</h5>
        </div>
        <a className="btn lightBtn ghostClonePerfectButton" href={consoleUrl}>Explore Ghost</a>
      </motion.div>
      </div>
    </motion.section>
    <Footer/>
  </main>
}

export function TrainingPage(){return <main><Header/><section className="trainingHero"><Image src="/images/training.jpg" alt="Immortal Training" fill priority sizes="100vw"/><motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1}}><Image src="/images/logo.svg" alt="Immortal" width={520} height={160}/><h1>TRAINING</h1></motion.div></section><section className="whiteStatement"><GlitchCorners/><Reveal><h2>BECOME A CERTIFIED IMMORTAL.<br/><span>MASTER REAL-WORLD CYBERSECURITY.</span></h2></Reveal></section><section className="trainingBody"><Reveal><small>LEARN FROM THE TEAM</small><h2>Six specialists.<br/>Limitless potential.</h2><p>Progress through interactive missions, build practical skills and earn specialist medals. Every scenario is based on the work modern defenders perform every day.</p></Reveal><div className="trainingGrid">{cards.map(([slug,d])=><Link href={`/${slug}`} key={slug} style={{"--accent":d.accent} as any}><Image src={`/images/${d.key}.png`} alt={d.name} fill sizes="33vw"/><div><b>{d.name}</b><span>{d.role}</span></div></Link>)}</div></section><FinalCTA/><Footer/></main>}

const academyCampaigns = [
  ["Intelligence Specialist", "ghost", "/intelligence-specialist"],
  ["Penetration Tester", "spectre", "/penetration-tester"],
  ["Operations Specialist", "pulse", "/security-operations"],
  ["Incident Responder", "hex", "/incident-responder"],
  ["GRC Specialist", "pandora", "/grc-specialist"],
  ["Security Engineer", "link", "/security-engineer"],
] as const;

const executiveMissions = [
  {
    title: "Cybersecurity Burnout: Recognizing and Resolving the Hidden Crisis",
    description: "Ghost reveals how to recognize burnout, understand why it happens, and take practical steps that create lasting change.",
    time: "12m", image: "burnout.png",
    href: "/mission/cybersecurity-burnout-recognizing-and-resolving-the-hidden-crisis",
  },
  {
    title: "Cybersecurity Staff Augmentation: Why Your Next Teammate Might Not Be Human",
    description: "Rethink staff augmentation and discover how human teams can work alongside always-on AI specialists.",
    time: "15m", image: "staff.png",
    href: "https://www.immortals.co/mission/cybersecurity-staff-augmentation-why-your-next-teammate-might-not-be-human",
  },
  {
    title: "AI in Cybersecurity: How Forward-Thinking Teams Get Real Results",
    description: "Cut through the hype and see where AI makes a measurable difference for modern security teams.",
    time: "15m", image: "ai.png",
    href: "https://www.immortals.co/mission/ai-in-cybersecurity-how-forward-thinking-teams-get-real-results",
  },
] as const;

const latestMissions = [
  { title: "Humans + AI — Building the Next-Gen Cybersecurity Team", description: "Clear the fog around AI and build confidence in how it behaves when the stakes are high.", time: "8m", image: "skills.png" },
  { title: "From Reactive to Predictive: Elevating Cyber Strategy with AI", description: "Pandora shows how predictive GRC helps teams move from delayed response to forward-looking defense.", time: "15m", image: "ai.png" },
  { title: "The Cybersecurity Skills Shortage: Navigating the Talent Crisis", description: "Explore the internal threat created by the global skills gap and the practical routes through it.", time: "12m", image: "skills.png" },
  { title: "Meet Ghost: Inside the Mind of an Immortal Cybersecurity Assistant", description: "Step inside Ghost’s origin story and the intelligence practice that powers an immortal cyber team.", time: "10m", image: "burnout.png" },
] as const;

function MissionCard({ mission, latest = false }: { mission: { readonly title:string; readonly description:string; readonly time:string; readonly image:string; readonly href?:string }, latest?:boolean }) {
  const external = mission.href?.startsWith("http");
  return <motion.a className={latest ? "academyMission academyMissionLatest" : "academyMission"} href={mission.href || "#academy-latest"} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} whileHover={{y:-8}} transition={{duration:.22}}>
    <div className="academyMissionImage"><Image src={`/images/academy/${mission.image}`} alt="" fill sizes={latest ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"}/></div>
    <div className="academyMissionCopy"><h3>{mission.title}</h3><p>{mission.description}</p></div>
    <div className="academyMissionMeta"><span>Beginner</span><span>{mission.time}</span><b aria-hidden><i/></b></div>
  </motion.a>;
}

export function AcademyPage() {
  return <main className="academyPage">
    <Header/>
    <section className="academyHero">
      <video autoPlay muted loop playsInline poster="/images/academy/hero.jpg">
        <source src="/images/academy/immortal-academy-hero.mp4" type="video/mp4"/>
      </video>
      <div className="academyHeroShade"/>
      <motion.div className="academyHeroMark" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1.1,ease:[.2,.8,.2,1]}}>
        <Image src="/images/academy/academy-logo.svg" alt="Immortal Academy" width={760} height={210} priority/>
      </motion.div>
      <a className="academyScroll" href="#academy-campaigns">Explore campaigns <span>↓</span></a>
    </section>

    <section id="academy-campaigns" className="academyCampaigns">
      <Reveal><h1>Specialist Campaigns</h1><p>Explore structured, role-based learning paths across core cybersecurity domains — from intelligence and pentesting to SecOps, GRC, and incident response. Each campaign is hands-on, guided, and built for real impact.</p></Reveal>
      <div className="academyCampaignGrid">{academyCampaigns.map(([label,key,href],index)=><Reveal key={key} delay={index*.05}><Link href={href} className="academyCampaign"><div><Image src={`/images/academy/${key}.png`} alt="" fill sizes="(max-width: 700px) 50vw, 16vw"/></div><span>{label}</span></Link></Reveal>)}</div>
    </section>

    <section id="academy-executive" className="academyExecutive">
      <div className="academyCut" aria-hidden/>
      <Reveal><h2>Executive Campaign</h2><small>N/A</small></Reveal>
      <div className="academyMissionGrid">{executiveMissions.map((mission,index)=><Reveal key={mission.title} delay={index*.08}><MissionCard mission={mission}/></Reveal>)}</div>
    </section>

    <section id="academy-latest" className="academyLatest">
      <Reveal><h2>Latest Missions</h2></Reveal>
      <div className="academyLatestGrid">{latestMissions.map((mission,index)=><Reveal key={mission.title} delay={(index%2)*.08}><MissionCard mission={mission} latest/></Reveal>)}</div>
    </section>
    <Footer/>
  </main>;
}

const plans=[["Free Tier","$0","-"],["SMB Tier","$3k","1 - 50"],["Medium Business Tier","$9k","50 - 200"],["Large Business Tier","$27k","200 - 700"],["Enterprise Tier","Custom","700 - 10,000+"]];
export function PricingPage(){const[annual,setAnnual]=useState(false);return <main><Header/><section className="pricing"><Reveal><small>Pricing</small><h1>Get started on the Free Tier</h1><p>Experience the power of an AI-powered cybersecurity team with the Free Tier—no credit card required—featuring full access to the entire Immortal Cyber Team for 24x7 protection.</p></Reveal><Reveal className="planHead"><h2>Immortal Plans</h2><span>Annual Payment 12.5% discount</span><button onClick={()=>setAnnual(!annual)}><i className={!annual?"selected":""}>Monthly</i><i className={annual?"selected":""}>Annual</i><b>Save 12.5%</b></button></Reveal><div className="planTable">{plans.map((p,i)=><motion.div key={p[0]} className={i===1?"featured":""} whileHover={{y:-8}}><h3>{p[0]}</h3><strong>{annual&&i>0&&i<4?`$${Math.round(parseInt(p[1].slice(1))*0.875)}k`:p[1]}<small>{i<4?"/month":""}</small></strong><a href={consoleUrl}>{i<3?"Sign Up":"Let's Chat"}</a><dl><dt>Employee Count</dt><dd>{p[2]}</dd><dt>Immortal Cyber Team</dt><dd>All 6 specialists</dd><dt>24/7 Monitoring</dt><dd>Included</dd></dl></motion.div>)}</div></section><FinalCTA/><Footer/></main>}

function GlitchPage({title,children}:{title:string,children:React.ReactNode}){return <main><Header/><section className="glitchHero"><GlitchCorners/><motion.h1 initial={{opacity:0,letterSpacing:".25em"}} animate={{opacity:1,letterSpacing:"-.04em"}} transition={{duration:1}}>{title}</motion.h1></section>{children}<Footer/></main>}
export function AboutPage(){return <GlitchPage title="BUILDING THE FUTURE OF CYBERSECURITY"><section className="editorial"><Reveal><small>OUR MISSION</small><h2>Human potential.<br/>Superhuman defence.</h2><p>We created Immortal Cyber Teams to make exceptional security skills instantly available to every organisation. Our specialists work together continuously, turning fragmented tools and overwhelming data into decisive action.</p></Reveal><Image src="/images/team.webp" alt="Immortal team" width={1400} height={800}/><div className="threeCols"><Reveal><h3>Always learning</h3><p>Every new threat strengthens the entire team.</p></Reveal><Reveal><h3>Built for action</h3><p>Clear recommendations, evidence, and outcomes.</p></Reveal><Reveal><h3>Available to all</h3><p>Start free and scale without hiring delays.</p></Reveal></div></section><FinalCTA/></GlitchPage>}
export function PartnersPage(){return <GlitchPage title="STRONGER TOGETHER. BUILT WITH INDUSTRY LEADERS."><section className="editorial"><Reveal><small>IMMORTAL PARTNERS</small><h2>Extend your reach.<br/>Accelerate every outcome.</h2><p>Immortal partners combine specialist expertise, trusted relationships and the world’s most capable AI cyber team to deliver exceptional protection at scale.</p><a href="https://submit.immortals.co/" className="btn darkBtn">Become a Partner</a></Reveal><div className="partnerBand"><span>TICOM</span><span>ETERNAL CYBER</span><span>AUSCERT</span><span>IMMORTAL</span></div></section></GlitchPage>}
export function LegalPage({type}:{type:string}){const privacy=type==="privacy-policy";return <main><Header/><section className="legal"><small>LAST UPDATED JULY 2026</small><h1>{privacy?"Privacy Policy":"Terms of Use"}</h1><p>This document explains the terms that govern access to Immortal Cyber Teams and how personal information is collected, used, protected, and shared.</p>{["Overview","Using our services","Accounts and security","Data and privacy","Intellectual property","Acceptable use","Service availability","Contact us"].map((h,i)=><section key={h}><h2>{i+1}. {h}</h2><p>By accessing the service, you agree to use it lawfully and responsibly. We apply appropriate technical and organisational safeguards and only process information for legitimate business and service purposes. For questions, contact the Immortal Cyber Teams support team.</p></section>)}</section><Footer/></main>}
