import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ | Mozcyber",
  description:
    "Perguntas frequentes sobre a comunidade Mozcyber, eventos e como participar.",
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqSection />
    </>
  );
}
