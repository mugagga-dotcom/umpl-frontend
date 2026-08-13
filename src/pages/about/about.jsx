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

const saccoServices = [
  {
    iconClass: "fi fi-rr-piggy-bank",
    title: "Savings & Loans",
    description: "Affordable loans for members' personal and professional needs with competitive interest rates"
  },
  {
    iconClass: "fi fi-rr-book-alt",
    title: "Training & Development",
    description: "Financial literacy programs and professional development courses for all members"
  },
  {
    iconClass: "fi fi-rr-handshake",
    title: "Group Welfare",
    description: "Mutual aid support including health insurance, emergency assistance and social benefits"
  },
  {
    iconClass: "fi fi-rr-briefcase",
    title: "Business Opportunities",
    description: "Joint ventures and business collaborations to create additional income streams"
  },
  {
    iconClass: "fi fi-rr-chart-line-up",
    title: "Wealth Management",
    description: "Investment opportunities and financial advisory services to grow members' wealth"
  },
  {
    iconClass: "fi fi-rr-shield-check",
    title: "Member Protection",
    description: "Security schemes and protection programs to safeguard members' interests"
  },
];

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
        "A dedicated savings and credit cooperative society designed exclusively for UMPL members to provide financial security, investment opportunities, and mutual support within our media presenters community."
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
            {contentLines.length > 0 && (
              <p style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {contentLines[0]}
              </p>
            )}
          </div>
        </div>

        <div className="sacco-grid">
          {saccoServices.map((service, index) => (
            <div className="sacco-card" key={index}>
              <div className="sacco-icon">
                <i className={service.iconClass}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="sacco-benefit">
          <div className="sacco-benefit-content">
            <h3>Why Join Our SACCO?</h3>
            <ul>
              <li><i className="fi fi-rr-check sacco-check"></i> Build personal wealth through disciplined savings</li>
              <li><i className="fi fi-rr-check sacco-check"></i> Access emergency loans with flexible repayment terms</li>
              <li><i className="fi fi-rr-check sacco-check"></i> Benefit from collective purchasing power and discounts</li>
              <li><i className="fi fi-rr-check sacco-check"></i> Secure your family's future with group insurance schemes</li>
              <li><i className="fi fi-rr-check sacco-check"></i> Network and collaborate with fellow media professionals</li>
              <li><i className="fi fi-rr-check sacco-check"></i> Participate in dividends from SACCO profits</li>
            </ul>
          </div>
          <div className="sacco-benefit-image">
            <div className="sacco-image-placeholder">
              <div className="placeholder-text">
                <i className="fi fi-rr-diamond sacco-gem-icon"></i>
                <p>Financial Empowerment for Media Presenters</p>
              </div>
            </div>
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
