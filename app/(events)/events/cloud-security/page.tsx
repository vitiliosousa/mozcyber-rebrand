import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakerSection from "./SpeakerSection";
import TopicsSection from "./TopicsSection";
import CTASection from "./CTASection";

export default function CloudSecurityPage() {
  return (
    <main
      className="min-h-screen text-gray-900"
      style={{ background: "linear-gradient(to right, #FAFAF9, #F5F5F4)" }}
    >
      <HeroSection />
      <AboutSection />
      <SpeakerSection />
      <TopicsSection />
      <CTASection />
    </main>
  );
}
