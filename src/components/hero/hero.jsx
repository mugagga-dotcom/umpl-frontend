import "./hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const HERO_IMAGE = "/hero.jpeg";

function Hero() {
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState(null);

  // Fetch hero text content from backend
  useEffect(() => {
    fetch(`${API_URL}/settings/content/homepage_hero`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setHeroContent(data.data);
      })
      .catch(() => {});
  }, []);

  const lines = heroContent?.content
    ? heroContent.content.split("\n").filter((l) => l.trim().length > 0)
    : [];
  const subtitle =
    lines.slice(1).join(" ") ||
    "Uniting media presenters across Uganda through professionalism, unity, integrity and excellence.";

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
    >
      <div className="hero-inner">
        <p>{subtitle}</p>
        <div className="hero-buttons">
    <button
        className="btn-secondary"
        onClick={() => navigate("/about")}
    >
        Learn More
    </button>

    <button
        className="btn-secondary"
        onClick={() => navigate("/contact")}
    >
        Contact Us
    </button>
     </div>
      </div>
    </section>
  );
}

export default Hero;