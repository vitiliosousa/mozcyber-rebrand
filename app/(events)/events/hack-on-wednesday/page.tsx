import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakersSection from "./SpeakersSection";
import TopicsSection from "./TopicsSection";
import CTASection from "./CTASection";

export default function HackOnWednesdayPage() {
  return (
    <main
      className="min-h-screen bg-linear-to-r from-[#0C1116] to-[#1D1D22] text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <TopicsSection />
      <CTASection />
    </main>
  );
}
