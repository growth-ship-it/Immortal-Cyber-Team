"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

export const specialists: Record<string, any> = {
  "intelligence-specialist": { name: "GHOST", role: "Intelligence Specialist", key: "ghost", accent: "#e554ff", intro: "Ghost is your Intelligence Specialist and founder of the Immortal Cyber Team. Rising from Baltimore's streets, she evolved from hacker to intelligence visionary.", briefing: "Join the Daily Intelligence Briefing", capabilities: ["Daily Intelligence Briefing", "Monitor Global Threat Actor Activities", "Dark Web Monitoring", "Monitor Third-Party Supplier Exposures", "Leaked Password Monitoring", "Stealer Malware Monitoring", "Secure Breached Accounts", "Track the Latest Vulnerabilities", "Track the Latest Exploits", "Cyber Threat Intelligence Feeds", "Dumpsite Data Leak Monitoring", "Create Intelligence Reports"] },
  "penetration-tester": { name: "SPECTRE", role: "Penetration Tester", key: "spectre", accent: "#cef069", intro: "Spectre is your elite Penetration Tester. He maps every exposed system, finds vulnerabilities, exploits weaknesses, and reports the path an attacker would take.", briefing: "Daily Penetration Test Briefing", capabilities: ["Daily Penetration Test Briefing", "Manage Penetration Tests", "External Penetration Testing", "Internal Penetration Testing", "Web Application Testing", "Cloud Security Testing", "Exploit Vulnerabilities", "Password Cracking", "Lateral Movement", "Create Penetration Test Reports"] },
  "security-operations": { name: "PULSE", role: "Security Operations Specialist", key: "pulse", accent: "#fff06a", intro: "Pulse is your Security Operations Specialist, continuously monitoring identities, endpoints, cloud systems and network signals to stop attackers the moment they surface.", briefing: "Daily Security Operations Briefing", capabilities: ["Daily Security Operations Briefing", "Endpoint Detection & Response", "Cloud Security Monitoring", "Identity Threat Detection", "Firewall and VPN Monitoring", "Security Event Triage", "Threat Hunting", "Malware Detection", "Escalate Anomalies", "Create Operations Reports"] },
  "incident-responder": { name: "HEX", role: "Incident Responder", key: "hex", accent: "#a99af4", intro: "Hex is your Incident Responder. He collects forensic evidence, analyses memory and logs, traces malware indicators and neutralises persistence before threats can spread.", briefing: "Daily Incident Response Briefing", capabilities: ["Daily Incident Response Briefing", "Evidence Collection and Analysis", "Memory Forensics", "Malware Analysis", "Log Investigation", "Network and Browser Analysis", "Compromise Assessment", "Contain Threats", "Eradicate Persistence", "Incident Response Reports"] },
  "grc-specialist": { name: "PANDORA", role: "GRC Specialist", key: "pandora", accent: "#64c8e8", intro: "Pandora is your GRC Specialist. She turns complex regulations into clear action, validates controls, assesses risk and automates evidence and reporting.", briefing: "Daily GRC Briefing", capabilities: ["Security Standard Gap Analysis", "Security Control Validation", "Third-Party Risk Assessments", "Compliance Monitoring", "Risk Register Management", "Policy Development", "Framework Mapping", "Audit Evidence Collection", "Executive Reporting", "Automated Documentation"] },
  "security-engineer": { name: "LINK", role: "Security Engineer", key: "link", accent: "#6ee7b7", intro: "Link is your Security Engineer. He connects the Immortals to your infrastructure, reviews configurations and automates remediation so nothing slips through the cracks.", briefing: "Daily Security Engineer Briefing", capabilities: ["Daily Security Engineer Briefing", "Discover Assets", "Deploy Endpoint Agents", "Integrate Security Solutions", "Cloud Configuration Review", "Identity Configuration Review", "Harden Systems", "Automate Remediation", "Manage Security Tools", "Engineering Reports"] },
};

function Header() {
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
        <button type="button" aria-haspopup="true" aria-expanded={openDrop === "immortals"} onClick={() => toggleDrop("immortals")}>Immortals <span aria-hidden>⌄</span></button>
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
        <button type="button" aria-haspopup="true" aria-expanded={openDrop === "company"} onClick={() => toggleDrop("company")}>Company <span aria-hidden>⌄</span></button>
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

function Footer() { return <footer><div className="footerTop"><div><Image src="/images/logo.svg" alt="Immortal Cyber Teams" width={175} height={58}/><p>Imagine limitless resources, skills and capabilities with Immortal Cyber Teams.</p></div><div><h4>Immortals</h4>{Object.entries(specialists).map(([s,d])=><Link key={s} href={`/${s}`}>{d.role}</Link>)}</div><div><h4>Company</h4><Link href="/pricing">Pricing</Link><Link href="/about-us">About Us</Link><Link href="/partners">Partners</Link><Link href="/terms-of-use">Terms of Use</Link><Link href="/privacy-policy">Privacy Policy</Link></div></div><div className="copyright">© 2026 Immortal Cyber Teams. All rights reserved.<span>✕　in　f　▶</span></div></footer> }

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
  const [activeArea, setActiveArea] = useState(0);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const area = ghostAreas[activeArea];
  const { scrollYProgress } = useScroll();
  const ghostShift = useTransform(scrollYProgress, [0,.16], [0,80]);
  const askGhost = (text?:string) => { setQuery(text || query); setSubmitted(Boolean(text || query)); };

  return <main className="ghostPage" style={{"--accent":data.accent} as any}>
    <Header/>
    <section className="ghostHero" aria-label="Ghost Intelligence Specialist">
      <motion.div className="ghostHeroPortrait" style={{y:ghostShift}} initial={{scale:1.08, opacity:.72}} animate={{scale:1,opacity:1}} transition={{duration:1.15,ease:[.2,.8,.2,1]}}><Image src="/images/ghost.png" alt="Ghost, Immortal Intelligence Specialist" fill priority loading="eager" sizes="100vw"/></motion.div>
      <div className="ghostGrid" aria-hidden/>
      <div className="ghostScanline" aria-hidden/>
      <motion.div className="ghostHeroCopy" initial="hidden" animate="visible" variants={{hidden:{opacity:0,y:36},visible:{opacity:1,y:0,transition:{delay:.18,duration:.85,ease:[.06,.77,.56,1]}}}}>
        <p className="ghostEyebrow"><span/> IMMORTAL INTELLIGENCE</p>
        <h1>Ghost</h1>
        <p className="ghostHeroAddress">Threat actors<br/>Dark web exposure<br/>Vulnerability signals</p>
      </motion.div>
      <motion.div className="ghostManifesto" initial={{opacity:0,y:72}} animate={{opacity:1,y:0}} transition={{delay:.62,duration:.8,ease:[.36,.91,.56,1]}}>
        <span>Your cyber</span>
        <span>intelligence</span>
        <span>advantage</span>
      </motion.div>
      <button className="ghostScroll" onClick={() => document.getElementById("ghost-intelligence")?.scrollIntoView({behavior:"smooth"})}>See what Ghost sees <b>↓</b></button>
      <aside className="ghostStatus"><i/> ONLINE / MONITORING<br/><span>24x7 threat intelligence</span></aside>
    </section>

    <section id="ghost-intelligence" className="ghostIntro">
      <Reveal><p className="ghostEyebrow dark"><span/> MEET GHOST</p><h2>Intelligence that<br/>keeps pace with<br/>your business.</h2><p>Ghost sees the signals that matter, connects them to your environment, and gives your team a clear route from alert to action.</p></Reveal>
      <Reveal className="ghostIntroNote" delay={.12}><div className="pulseMark">✦</div><p>She brings global threat activity, third-party exposure and vulnerability risk into one operational picture.</p><a href={consoleUrl}>Start a conversation <b>↗</b></a></Reveal>
    </section>

    <section className="ghostCore">
      <div className="ghostCoreHeading"><p className="ghostEyebrow"><span/> INTELLIGENCE WORKBENCH</p><h2>One specialist.<br/>Four ways ahead.</h2></div>
      <div className="ghostAreaSelector" role="tablist" aria-label="Ghost intelligence areas">{ghostAreas.map((item,index)=><button key={item.id} role="tab" aria-selected={activeArea===index} className={activeArea===index?"selected":""} onClick={()=>setActiveArea(index)}><small>{item.number}</small><span>{item.label}</span><i>↘</i></button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={area.id} className="ghostArea" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} transition={{duration:.35}}>
        <div className="ghostAreaCopy"><p className="ghostAreaNumber">/{area.number}</p><h3>{area.label}</h3><h4>{area.kicker}</h4><p>{area.summary}</p><ul><li>Monitor high-priority signals</li><li>Correlate exposures to your estate</li><li>Create decision-ready reports</li></ul></div>
        <div className="ghostConsole"><div className="consoleTop"><span className="liveDot"/> GHOST / {area.id.toUpperCase()}<b>LIVE FEED</b></div><div className="consoleOrbit"><i/><i/><i/><i/><strong>◉</strong></div><div className="consoleLog"><span>Signal scan complete</span><span>New relationships detected</span><span>Business impact mapped</span></div></div>
      </motion.div></AnimatePresence>
    </section>

    <section className="ghostAsk"><div className="ghostAskSticky"><p className="ghostEyebrow"><span/> TALK WITH GHOST</p><h2>Turn a signal<br/>into a decision.</h2><p>Ask Ghost to investigate, analyse and explain what she is seeing in clear language.</p><div className="ghostAskInput"><input value={query} onChange={(event)=>{setQuery(event.target.value);setSubmitted(false)}} onKeyDown={(event)=>event.key==="Enter"&&askGhost()} placeholder="What would you like Ghost to investigate?" aria-label="Ask Ghost anything"/><button onClick={()=>askGhost()}>↗</button></div>{submitted&&<motion.p className="ghostResponse" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>Query queued for Ghost. She’ll help you investigate: “{query}”</motion.p>}</div>
      <div className="ghostPrompts"><p>Example questions for Ghost</p>{area.actions.map((action)=><button key={action} onClick={()=>askGhost(action)}><span>↗</span>{action}</button>)}<div className="ghostOutputs"><p>Outputs</p>{area.outputs.map((output)=><span key={output}>◦ {output}</span>)}</div></div>
    </section>

    <section className="ghostClosing"><div className="ghostClosingType" aria-hidden>GHOST<br/>ONLINE</div><Reveal><p className="ghostEyebrow"><span/> THE IMMORTAL CYBER TEAM</p><h2>Give your team<br/><em>an intelligence edge.</em></h2><p>Ghost is there whenever you need context—continuously transforming global activity into a focused next move for your team.</p><a className="ghostCta" href={consoleUrl}>Add Ghost to your team <b>↗</b></a></Reveal><Image src="/images/ghost.png" alt="" fill sizes="(max-width: 700px) 100vw, 48vw"/></section>
    <Footer/>
  </main>
}

export function TrainingPage(){return <main><Header/><section className="trainingHero"><Image src="/images/training.jpg" alt="Immortal Training" fill priority sizes="100vw"/><motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1}}><Image src="/images/logo.svg" alt="Immortal" width={520} height={160}/><h1>TRAINING</h1></motion.div></section><section className="whiteStatement"><GlitchCorners/><Reveal><h2>BECOME A CERTIFIED IMMORTAL.<br/><span>MASTER REAL-WORLD CYBERSECURITY.</span></h2></Reveal></section><section className="trainingBody"><Reveal><small>LEARN FROM THE TEAM</small><h2>Six specialists.<br/>Limitless potential.</h2><p>Progress through interactive missions, build practical skills and earn specialist medals. Every scenario is based on the work modern defenders perform every day.</p></Reveal><div className="trainingGrid">{cards.map(([slug,d])=><Link href={`/${slug}`} key={slug} style={{"--accent":d.accent} as any}><Image src={`/images/${d.key}.png`} alt={d.name} fill sizes="33vw"/><div><b>{d.name}</b><span>{d.role}</span></div></Link>)}</div></section><FinalCTA/><Footer/></main>}

const plans=[["Free Tier","$0","-"],["SMB Tier","$3k","1 - 50"],["Medium Business Tier","$9k","50 - 200"],["Large Business Tier","$27k","200 - 700"],["Enterprise Tier","Custom","700 - 10,000+"]];
export function PricingPage(){const[annual,setAnnual]=useState(false);return <main><Header/><section className="pricing"><Reveal><small>Pricing</small><h1>Get started on the Free Tier</h1><p>Experience the power of an AI-powered cybersecurity team with the Free Tier—no credit card required—featuring full access to the entire Immortal Cyber Team for 24x7 protection.</p></Reveal><Reveal className="planHead"><h2>Immortal Plans</h2><span>Annual Payment 12.5% discount</span><button onClick={()=>setAnnual(!annual)}><i className={!annual?"selected":""}>Monthly</i><i className={annual?"selected":""}>Annual</i><b>Save 12.5%</b></button></Reveal><div className="planTable">{plans.map((p,i)=><motion.div key={p[0]} className={i===1?"featured":""} whileHover={{y:-8}}><h3>{p[0]}</h3><strong>{annual&&i>0&&i<4?`$${Math.round(parseInt(p[1].slice(1))*0.875)}k`:p[1]}<small>{i<4?"/month":""}</small></strong><a href={consoleUrl}>{i<3?"Sign Up":"Let's Chat"}</a><dl><dt>Employee Count</dt><dd>{p[2]}</dd><dt>Immortal Cyber Team</dt><dd>All 6 specialists</dd><dt>24/7 Monitoring</dt><dd>Included</dd></dl></motion.div>)}</div></section><FinalCTA/><Footer/></main>}

function GlitchPage({title,children}:{title:string,children:React.ReactNode}){return <main><Header/><section className="glitchHero"><GlitchCorners/><motion.h1 initial={{opacity:0,letterSpacing:".25em"}} animate={{opacity:1,letterSpacing:"-.04em"}} transition={{duration:1}}>{title}</motion.h1></section>{children}<Footer/></main>}
export function AboutPage(){return <GlitchPage title="BUILDING THE FUTURE OF CYBERSECURITY"><section className="editorial"><Reveal><small>OUR MISSION</small><h2>Human potential.<br/>Superhuman defence.</h2><p>We created Immortal Cyber Teams to make exceptional security skills instantly available to every organisation. Our specialists work together continuously, turning fragmented tools and overwhelming data into decisive action.</p></Reveal><Image src="/images/team.webp" alt="Immortal team" width={1400} height={800}/><div className="threeCols"><Reveal><h3>Always learning</h3><p>Every new threat strengthens the entire team.</p></Reveal><Reveal><h3>Built for action</h3><p>Clear recommendations, evidence, and outcomes.</p></Reveal><Reveal><h3>Available to all</h3><p>Start free and scale without hiring delays.</p></Reveal></div></section><FinalCTA/></GlitchPage>}
export function PartnersPage(){return <GlitchPage title="STRONGER TOGETHER. BUILT WITH INDUSTRY LEADERS."><section className="editorial"><Reveal><small>IMMORTAL PARTNERS</small><h2>Extend your reach.<br/>Accelerate every outcome.</h2><p>Immortal partners combine specialist expertise, trusted relationships and the world’s most capable AI cyber team to deliver exceptional protection at scale.</p><a href="https://submit.immortals.co/" className="btn darkBtn">Become a Partner</a></Reveal><div className="partnerBand"><span>TICOM</span><span>ETERNAL CYBER</span><span>AUSCERT</span><span>IMMORTAL</span></div></section></GlitchPage>}
export function LegalPage({type}:{type:string}){const privacy=type==="privacy-policy";return <main><Header/><section className="legal"><small>LAST UPDATED JULY 2026</small><h1>{privacy?"Privacy Policy":"Terms of Use"}</h1><p>This document explains the terms that govern access to Immortal Cyber Teams and how personal information is collected, used, protected, and shared.</p>{["Overview","Using our services","Accounts and security","Data and privacy","Intellectual property","Acceptable use","Service availability","Contact us"].map((h,i)=><section key={h}><h2>{i+1}. {h}</h2><p>By accessing the service, you agree to use it lawfully and responsibly. We apply appropriate technical and organisational safeguards and only process information for legitimate business and service purposes. For questions, contact the Immortal Cyber Teams support team.</p></section>)}</section><Footer/></main>}
