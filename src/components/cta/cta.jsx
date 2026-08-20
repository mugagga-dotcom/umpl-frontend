import "./cta.css";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">

      <div className="cta-overlay">

        <h2>Become Part of Uganda's Largest Network of Media Presenters</h2>

        <p>
          Join the Uganda Media Presenters League and enjoy professional
          networking, capacity building, advocacy and opportunities that
          strengthen your career in the media industry.
        </p>

        <div className="cta-buttons">
          <Link to="/contact" className="btn-primary">
            Join UMPL
          </Link>

          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}

export default CTA;