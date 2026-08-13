import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import VisionMission from "./pages/VisionMission/VisionMission";
import Executive from "./pages/Executive/Executive";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

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