import Hero from "../../components/Hero/Hero";
import Welcome from "../../components/Welcome/Welcome";
import VisionSection from "../../components/VisionSection/VisionSection";
import CoreValues from "../../components/CoreValues/CoreValues";
import Executive from "../../components/Executive/Executive";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

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