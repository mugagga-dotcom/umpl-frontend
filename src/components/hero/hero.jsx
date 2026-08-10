import "./hero.css";

function Hero() {
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
          <button className="btn-secondary" style={{ marginRight: '15px' }}>
            Learn More
          </button>
          <button className="btn-secondary">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;