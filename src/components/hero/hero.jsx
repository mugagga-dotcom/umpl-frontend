import "./hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Hero() {
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/settings/content/homepage_hero`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setHeroContent(data.data);
      })
      .catch(() => {});
  }, []);

  // First line of content is the tagline, rest is the subtitle
  const lines = heroContent?.content
    ? heroContent.content.split("\n").filter((l) => l.trim().length > 0)
    : [];
  const tagline = lines[0] || "Uniting Media Voices Across Uganda";
  const subtitle =
    lines.slice(1).join(" ") ||
    "Uniting media presenters across Uganda through professionalism, unity, integrity and excellence.";

  return (
    <section className="hero">
      <div className="overlay">
        <img src="/logo.jpeg" alt="UMPL Logo" className="hero-logo" />

        <h1>
          {heroContent?.title || "Uganda Media Presenters League"}
        </h1>

        <p>{subtitle}</p>

        <div className="hero-buttons">
          <button
            className="btn-secondary"
            style={{ marginRight: "15px" }}
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