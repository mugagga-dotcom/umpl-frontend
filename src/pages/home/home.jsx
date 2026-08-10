import Hero from "../../components/hero/hero";
import Welcome from "../../components/welcome/welcome";
import VisionSection from "../../components/visionsection/visionsection";
import CoreValues from "../../components/corevalues/corevalues";
import Executive from "../../components/executive/executive";
import CTA from "../../components/cta/cta";
import Footer from "../../components/footer/footer";

function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <VisionSection />
      <CoreValues />
      <Executive />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;