import "./about.css";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const members = [
  {
    name: "MBABAALI MALISEERI",
    position: "Chairperson",
    image: "/chairman.jpeg",
  },
  {
    name: "NDAWULA PETER SIMON",
    position: "Vice Chairman",
    image: "/vice chairman.jpeg",
  },
  {
    name: "NABUKENYA LILIAN",
    position: "Secretary",
    image: "/Secretary.jpeg",
  },
  {
    name: "NALUGWA CONNIE",
    position: "Treasurer",
    image: "/treasurer.jpeg",
  },
  {
    name: "SSEGAWA ISMAEL SUREMAN",
    position: "Publicity Officer",
    image: "/publicity.jpeg",
  },
];

// Removed unused saccoIcons

function Welcome() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/settings/content/homepage_about`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setContent(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="welcome">
      <div className="welcome-container">
        <div className="welcome-image">
          <img src="/logo.jpeg" alt="UMPL Logo" />
        </div>

        <div className="welcome-content">
          <h5>WELCOME TO UMPL</h5>
          <h2>
            {content?.title || "Uganda Media Presenters League"}
          </h2>
          <p>
            {content?.content ||
              "The Uganda Media Presenters League (UMPL) is a professional association that brings together media presenters from television, radio, digital media and other communication platforms across Uganda. UMPL promotes professionalism, unity, innovation and collaboration among media practitioners while contributing to the growth of Uganda's media industry."}
          </p>
        </div>
      </div>
    </section>
  );
}

function Sacco() {
  const [saccoData, setSaccoData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/settings/content/sacco_section`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setSaccoData(data.data);
      })
      .catch(() => {});
  }, []);

  const contentLines = saccoData?.content
    ? saccoData.content.split("\n").filter(line => line.trim() !== '')
    : [
        "A dedicated savings and credit cooperative society designed exclusively for UMPL members to provide financial security, investment opportunities, and mutual support within our media presenters community.",
        "Our SACCO provides:",
        "Savings and loan services tailored for media professionals",
        "Financial literacy training and workshops",
        "Investment opportunities for long-term financial security"
      ];

  return (
    <section className="sacco">
      <div className="sacco-container">
        <div className="section-header">
          <h5>MEMBER BENEFITS</h5>
          <h2>
            {saccoData?.title || "Media Presenters Fraternity Members SACCO"}
          </h2>
          
          <div className="sacco-dynamic-content" style={{ marginTop: '30px', textAlign: 'left', maxWidth: '800px', margin: '30px auto' }}>
            {contentLines.map((line, idx) => (
              <p key={idx} style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./) ? (
                  <span style={{ marginLeft: '20px', display: 'block' }}>{line}</span>
                ) : line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Executive() {
  return (
    <section className="executive">
      <div className="section-header">
        <h5>OUR LEADERSHIP</h5>
        <h2>Executive Committee</h2>
        <p>
          Meet the leaders dedicated to promoting professionalism, unity and
          excellence among media presenters in Uganda.
        </p>
      </div>

      <div className="executive-grid">
        {members.map((member, index) => (
          <div className="member-card" key={index}>
            <img src={member.image} alt={member.name} />
            <div className="member-info">
              <h3>{member.name}</h3>
              <h4>{member.position}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <Welcome />
      <Sacco />
      <Executive />
    </>
  );
}

export default About;
