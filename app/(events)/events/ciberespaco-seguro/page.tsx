import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakerSection from "./SpeakerSection";
import TopicsSection from "./TopicsSection";
import CTASection from "./CTASection";

export default function CiberespacoSeguroPage() {
  return (
    <main className="min-h-screen bg-[#513371] text-white">
      <HeroSection />
      <AboutSection />
      <SpeakerSection />
      <TopicsSection />
      <CTASection />
    </main>
  );
}
