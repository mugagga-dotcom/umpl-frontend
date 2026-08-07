import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import VisionMission from "./pages/VisionMission/VisionMission";
import Executive from "./pages/Executive/Executive";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<VisionMission />} />
        <Route path="/executive" element={<Executive />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;