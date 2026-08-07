import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import RulesSection from "./RulesSection";
import RankingSection from "./RankingSection";
import CTASection from "./CTASection";

export default function CaptureTheFlagPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-[#421C64] via-[#853F6E] to-[#C86178] text-white"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <HeroSection />
      <AboutSection />
      <RulesSection />
      <RankingSection />
      <CTASection />
    </main>
  );
}
