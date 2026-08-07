import type { Metadata } from "next";
import AboutCta from "@/components/about/AboutCta";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import MissionVisionValues from "@/components/about/MissionVisionValues";

export const metadata: Metadata = {
  title: "Sobre | Mozcyber",
  description:
    "Conhece a Mozcyber — missão, visão e valores da comunidade de cibersegurança em Moçambique.",
};

export default function SobrePage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVisionValues />
      <AboutCta />
    </>
  );
}
