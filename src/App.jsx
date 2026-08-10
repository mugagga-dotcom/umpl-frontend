import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import VisionMission from "./pages/visionmission/visionmission";
import Executive from "./pages/executive/executive";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/contact/contact";
import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<VisionMission />} />
        <Route path="/executive" element={<Executive />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;