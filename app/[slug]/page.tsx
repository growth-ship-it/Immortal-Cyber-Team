import { AboutPage, LegalPage, PartnersPage, PricingPage, SpecialistPage, TrainingPage } from "../../components/site";
import { notFound } from "next/navigation";

const specialistSlugs = ["intelligence-specialist", "penetration-tester", "security-operations", "incident-responder", "grc-specialist", "security-engineer"];

export function generateStaticParams() {
  return [...specialistSlugs, "training", "pricing", "about-us", "partners", "terms-of-use", "privacy-policy"].map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (specialistSlugs.includes(slug)) return <SpecialistPage slug={slug} />;
  if (slug === "training") return <TrainingPage />;
  if (slug === "pricing") return <PricingPage />;
  if (slug === "about-us") return <AboutPage />;
  if (slug === "partners") return <PartnersPage />;
  if (slug === "terms-of-use" || slug === "privacy-policy") return <LegalPage type={slug} />;
  notFound();
}
