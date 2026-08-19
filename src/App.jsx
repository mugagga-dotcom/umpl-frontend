import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import VisionMission from "./pages/visionmission/visionmission";
import Executive from "./pages/executive/executive";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/contact/contact";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/vision"
          element={
            <PublicLayout>
              <VisionMission />
            </PublicLayout>
          }
        />

        <Route
          path="/executive"
          element={
            <PublicLayout>
              <Executive />
            </PublicLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <PublicLayout>
              <Gallery />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
