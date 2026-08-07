import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SpeakersSection from "./SpeakersSection";
import GallerySection from "./GallerySection";
import CTASection from "./CTASection";

export default function WomanInCyberPage() {
  return (
    <main
      className="min-h-screen bg-[#1D182B] text-white"
      style={{ fontFamily: "'VT323', monospace" }}
    >
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <GallerySection />
      <CTASection />
    </main>
  );
}
