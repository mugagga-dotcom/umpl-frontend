import "./VisionMission.css";
import { FaEye, FaBullseye, FaCheckCircle, FaStar, FaFlag } from "react-icons/fa";

function VisionMission() {
  return (
    <section className="vision-section">
      <div className="section-title">
        <h5>OUR FOUNDATION</h5>
        <p>
          Our commitment is to promote professionalism, unity and excellence
          among media presenters throughout Uganda.
        </p>
      </div>

      <div className="vision-cards">
        <div className="vision-card">
          <FaStar className="icon" />
          <div>
            <h3>Our Motto</h3>
            <p className="motto-text">
              "One Voice One Vision"
            </p>
          </div>
        </div>

        <div className="vision-card">
          <FaFlag className="icon" />
          <div>
            <h3>Our Goal</h3>
            <p>
              To strengthen and promote the welfare, professionalism, unity and socio-economic development of media presenters and broadcasters in Uganda.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <FaEye className="icon" />
          <div>
            <h3>Vision</h3>
            <p>
              To be the leading professional association that unites and
              empowers media presenters in Uganda.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <FaBullseye className="icon" />
          <div>
            <h3>Mission</h3>
            <p>
              To promote professionalism, ethical conduct, capacity building,
              collaboration and innovation within Uganda's media industry.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <FaCheckCircle className="icon" />
          <div>
            <h3>Objectives</h3>
            <ul>
              <li>Promote professionalism and ethical conduct.</li>
              <li>Provide training and capacity building.</li>
              <li>Advocate and create networking opportunities.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;