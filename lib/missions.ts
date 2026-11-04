export type MissionBullet = { title?: string; text: string };

export type MissionBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: MissionBullet[] }
  | { type: "callout"; label: string; text: string }
  | { type: "checkpoint"; prompt: string; options: string[]; correct: number };

export type MissionSection = {
  heading: string;
  accent?: boolean;
  blocks: MissionBlock[];
};

export type MissionDocument = {
  slug: string;
  title: string;
  intro: string;
  learningGoals: string[];
  sections: MissionSection[];
  next: { title: string; description: string; image: string; href: string };
};

const burnout: MissionDocument = {
  slug: "cybersecurity-burnout-recognizing-and-resolving-the-hidden-crisis",
  title: "Cybersecurity Burnout: Recognizing and Resolving the Hidden Crisis",
  intro: "Hey there, I’m Ghost. Welcome to Immortal Academy’s special training on a hidden threat—cybersecurity burnout. You’ll learn how to spot burnout, understand why it happens, and what practical steps you can take right now to create lasting change.",
  learningGoals: [
    "Identify the signs and symptoms of burnout in cybersecurity teams.",
    "Understand the structural factors contributing to burnout.",
    "Recognize burnout as a genuine business risk.",
    "Learn practical strategies for preventing and addressing burnout within your team.",
  ],
  sections: [
    {
      heading: "Understanding the Burnout Crisis",
      blocks: [
        { type: "paragraph", text: "Burnout isn’t about personal weakness or lack of resilience. It’s a systemic issue rooted in the structure of cybersecurity work itself." },
        { type: "bullets", items: [{ title: "What is Burnout?", text: "Burnout is chronic exhaustion combined with detachment, reduced performance, and a feeling of hopelessness. In cybersecurity, burnout isn’t just common—it’s epidemic." }] },
      ],
    },
    {
      heading: "Interactive Insight: Did You Know?",
      blocks: [{ type: "callout", label: "Signal", text: "By 2025, Gartner predicted nearly half of cybersecurity leaders would change jobs due to stress and burnout—and it’s already happening." }],
    },
    {
      heading: "Recognizing the “Grind Culture” in Cybersecurity",
      blocks: [
        { type: "paragraph", text: "Let’s call it what it is: a crisis of unsustainable expectations. Global SOCs operate around the clock, and professionals get stuck in an endless loop of urgency." },
        { type: "callout", label: "The job never ends", text: "Security professionals work through weekends, holidays, and the middle of the night. The hours and pressure significantly affect their wellbeing." },
        { type: "paragraph", text: "The stakes are enormous. A single oversight can lead to millions in damages, so many defenders push themselves to catch everything, fix everything, and prevent the next disaster. Burnout becomes a badge of honor until it breaks them." },
        { type: "bullets", items: [
          { text: "50+ hour weeks that stretch into 60 or more." },
          { text: "Solo shifts managing security for a dozen clients." },
          { text: "No breaks, no slack, no backup." },
        ] },
        { type: "paragraph", text: "Automation can reduce noise, but tools do not repair leadership gaps, unrealistic expectations, or under-resourcing. Sometimes they add complexity to an already chaotic workflow." },
        { type: "paragraph", text: "This breeds a culture of fear and self-sacrifice. When cybersecurity works, it is invisible. When it fails, it becomes front-page news." },
      ],
    },
    {
      heading: "Pop-Up Discussion:",
      blocks: [{ type: "callout", label: "Reflect", text: "What does burnout look like on your team? Is it quiet resignation, constant exhaustion, or missed details? Think about the last time someone hit a wall. What led there?" }],
    },
    {
      heading: "Why Burnout Matters: Real Consequences for Teams and Businesses",
      blocks: [
        { type: "paragraph", text: "Burnout isn’t just a wellness issue. It is a costly, chronic, and preventable security risk. Its effects appear in missed alerts, slow response, and small oversights that become major breaches." },
        { type: "callout", label: "Fact Check", text: "83% of IT security professionals say burnout has directly contributed to security breaches in their organizations. This isn’t theoretical. It’s happening now." },
        { type: "bullets", items: [
          { title: "Mistakes increase.", text: "Dwell times stretch and threats linger longer than they should." },
          { title: "Institutional knowledge leaves.", text: "Experienced professionals take system history, context, and hard-won instincts with them." },
          { title: "The talent pipeline falls behind.", text: "Many professionals are considering leaving their roles—and some the field entirely." },
          { title: "Sick days add up.", text: "That affects project timelines, team cohesion, and incident response readiness." },
        ] },
        { type: "paragraph", text: "Recruiting replacements takes months. Training delays momentum. Compliance suffers, response times slow, and strategic initiatives stall. If your security team is burning out, your business is exposed." },
      ],
    },
    {
      heading: "How Companies (Unintentionally) Make Burnout Worse",
      blocks: [
        { type: "paragraph", text: "Most organizations believe they support cybersecurity, but their operating model often creates the conditions that burn teams out long before leadership notices." },
        { type: "bullets", items: [
          { title: "The Weight of ‘Do More With Less’", text: "Security budgets tighten while threat volume grows. Smaller teams inherit more responsibility and are blamed when the unsupported model fails." },
          { title: "Absent Leadership, No Real Backup", text: "Security leaders receive accountability without authority, modern tools, or enough trained people to execute." },
          { title: "No Room to Breathe, No Room to Grow", text: "Analysts drown in reactive work, false positives, patch cycles, and fragmented workflows with little opportunity for progression." },
          { title: "A Culture That Treats Burnout Like Weakness", text: "Wellness programs cannot fix workload, lack of agency, or unsafe environments where asking for help carries a penalty." },
          { title: "Isolation in a Remote-First World", text: "Distributed teams can become disconnected from the business and each other while the weight of their work stays unseen." },
        ] },
        { type: "callout", label: "Self-Reflection Question", text: "In your organization, is burnout openly discussed, or is it treated as a personal problem?" },
      ],
    },
    {
      heading: "Strategies for Combating Cybersecurity Burnout",
      blocks: [
        { type: "paragraph", text: "Protecting people requires rebuilding the environment they work in. Surface-level perks will not solve a structural problem." },
        { type: "bullets", items: [
          { title: "Realistic Shifts", text: "Rotate teams with clear off-hours and treat rest as a strategic resource." },
          { title: "Leadership Accountability", text: "Prioritize wellbeing, communication, and sustainability alongside operational metrics." },
          { title: "Mandatory Downtime", text: "Require recovery periods after major incidents and intense work." },
          { title: "Genuine Mental Health Support", text: "Offer accessible services without stigma or career penalty." },
          { title: "Celebrate Sustainability", text: "Value people who build durable systems instead of rewarding overwork." },
        ] },
        { type: "callout", label: "Quick Activity", text: "Rank these strategies from most urgent to least urgent in your own organization." },
      ],
    },
    {
      heading: "Wrap-Up: Cybersecurity Doesn’t Have to Break You",
      blocks: [
        { type: "paragraph", text: "Cybersecurity work is essential, meaningful, and challenging. But it should not break people. Addressing burnout is good ethics and good business." },
        { type: "callout", label: "Video Summary", text: "Cybersecurity burnout weakens your team’s ability to defend effectively. Protecting your people is protecting your business." },
      ],
    },
    {
      heading: "Test Your Understanding (Interactive Checkpoint):",
      accent: true,
      blocks: [{ type: "checkpoint", prompt: "What’s the first structural change you’d recommend in your organization to reduce cybersecurity burnout?", options: ["Install more security tools", "Implement mandatory downtime and rotation", "Hire more cybersecurity consultants", "Offer unlimited overtime"], correct: 1 }],
    },
  ],
  next: {
    title: "AI in Cybersecurity: How Forward-Thinking Teams Get Real Results",
    description: "Hey, Ghost here. Cut through the noise and explore where AI makes a difference and how smart security teams are using it effectively.",
    image: "/images/academy/ai.png",
    href: "https://www.immortals.co/mission/ai-in-cybersecurity-how-forward-thinking-teams-get-real-results",
  },
};

export const missions: Record<string, MissionDocument> = { [burnout.slug]: burnout };
export const missionSlugs = Object.keys(missions);
