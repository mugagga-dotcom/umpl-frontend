import "./CoreValues.css";
import {
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaAward,
  FaBullhorn,
} from "react-icons/fa";

function CoreValues() {
  return (
    <section className="core-values">

      <div className="section-title">
        <h4>OUR CORE VALUES</h4>
        <h2>What We Stand For</h2>
        <p>
          The Uganda Media Presenters League is guided by strong values that
          promote professionalism, unity and excellence in Uganda's media
          industry.
        </p>
      </div>

      <div className="values-grid">

        <div className="value-card">
          <FaUsers className="value-icon" />
          <h3>Unity</h3>
          <p>
            Bringing together media presenters across Uganda to speak with one
            voice.
          </p>
        </div>

        <div className="value-card">
          <FaHandshake className="value-icon" />
          <h3>Professionalism</h3>
          <p>
            Promoting high standards, ethics and competence within the media
            profession.
          </p>
        </div>

        <div className="value-card">
          <FaShieldAlt className="value-icon" />
          <h3>Integrity</h3>
          <p>
            Encouraging honesty, transparency and accountability in all media
            activities.
          </p>
        </div>

        <div className="value-card">
          <FaAward className="value-icon" />
          <h3>Excellence</h3>
          <p>
            Inspiring continuous improvement, innovation and quality service.
          </p>
        </div>

        <div className="value-card">
          <FaBullhorn className="value-icon" />
          <h3>Teamwork</h3>
          <p>
            Working together to strengthen and develop Uganda's media industry.
          </p>
        </div>

      </div>

    </section>
  );
}

export default CoreValues;