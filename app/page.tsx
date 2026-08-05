import Events from "@/components/Events";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <Events />
      <WhatWeDo />
      <Testimonials />
      <Team />
      <Partners />
    </>
  );
}
