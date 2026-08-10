import "./hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="overlay">
        <img src="/logo.jpeg" alt="UMPL Logo" className="hero-logo" />

        <h1>Uganda Media Presenters League</h1>

        <p>
          Uniting media presenters across Uganda through
          professionalism, unity, integrity and excellence.
        </p>

        <div className="hero-buttons">
          <button 
            className="btn-secondary" 
            style={{ marginRight: '15px' }}
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