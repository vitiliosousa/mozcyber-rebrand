import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakersSection from "./SpeakersSection";
import DebateSection from "./DebateSection";
import GallerySection from "./GallerySection";
import CTASection from "./CTASection";

export default function IescPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-r from-[#04000B] to-[#16006F] text-white"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <DebateSection />
      <GallerySection />
      <CTASection />
    </main>
  );
}
