import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakersSection from "./SpeakersSection";
import SectionsSection from "./SectionsSection";
import GallerySection from "./GallerySection";
import CTASection from "./CTASection";

export default function NighHackPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-r from-[#421C64] via-[#853F6E] to-[#C86178] text-white"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <SectionsSection />
      <GallerySection />
      <CTASection />
    </main>
  );
}
