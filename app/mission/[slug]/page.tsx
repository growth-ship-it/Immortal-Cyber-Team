import { notFound } from "next/navigation";
import { MissionArticlePage } from "../../../components/mission";
import { missions, missionSlugs } from "../../../lib/missions";

export function generateStaticParams() {
  return missionSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = missions[slug];
  if (!mission) notFound();
  return <MissionArticlePage mission={mission}/>;
}
