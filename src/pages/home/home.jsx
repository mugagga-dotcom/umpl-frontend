import Hero from "../../components/hero/hero";
import Welcome from "../../components/welcome/welcome";
// import VisionSection from "../../components/visionsection/visionsection";
import CoreValues from "../../components/corevalues/corevalues";
// import Executive from "../../components/executive/executive";

function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      {/* <VisionSection /> */}
      <CoreValues />
      {/* <Executive /> */}
    </>
  );
}

export default Home;