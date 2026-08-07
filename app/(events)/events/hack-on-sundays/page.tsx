import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SessionsSection from "./SessionsSection";
import SpeakersSection from "./SpeakersSection";
import CTASection from "./CTASection";

export default function HackOnSundaysPage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <AboutSection />
      <SessionsSection />
      <SpeakersSection />
      <CTASection />
    </main>
  );
}
