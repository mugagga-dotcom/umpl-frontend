import "./Welcome.css";

function Welcome() {
  return (
    <section className="welcome">

      <div className="welcome-container">

        <div className="welcome-image">
          <img src="/logo.jpeg" alt="UMPL Logo" />
        </div>

        <div className="welcome-content">

          <h5>WELCOME TO UMPL</h5>

          <h2>
            Uganda Media Presenters League
          </h2>

          <p>
            The Uganda Media Presenters League (UMPL) is a professional
            association that brings together media presenters from television,
            radio, digital media and other communication platforms across
            Uganda. UMPL promotes professionalism, unity, innovation and
            collaboration among media practitioners while contributing to the
            growth of Uganda's media industry.
          </p>
          <button>Read More</button>
        
        </div>

      </div>
    </section>
  );
}

export default Welcome;