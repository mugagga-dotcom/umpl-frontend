import "./CTA.css";

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
          <a href="/contact" className="btn-primary">
            Join UMPL
          </a>

          <a href="/contact" className="btn-secondary">
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}

export default CTA;