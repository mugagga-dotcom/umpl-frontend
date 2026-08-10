import "./about.css";

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
    position: "Publicity",
    image: "/publicity.jpeg",
  },
];

const saccoServices = [
  {
    icon: "💰",
    title: "Savings & Loans",
    description: "Affordable loans for members' personal and professional needs with competitive interest rates"
  },
  {
    icon: "📚",
    title: "Training & Development",
    description: "Financial literacy programs and professional development courses for all members"
  },
  {
    icon: "🤝",
    title: "Group Welfare",
    description: "Mutual aid support including health insurance, emergency assistance and social benefits"
  },
  {
    icon: "💼",
    title: "Business Opportunities",
    description: "Joint ventures and business collaborations to create additional income streams"
  },
  {
    icon: "📈",
    title: "Wealth Management",
    description: "Investment opportunities and financial advisory services to grow members' wealth"
  },
  {
    icon: "🛡️",
    title: "Member Protection",
    description: "Security schemes and protection programs to safeguard members' interests"
  },
];

function Welcome() {
  return (
    <section className="welcome">
      <div className="welcome-container">
        <div className="welcome-image">
          <img src="/logo.jpeg" alt="UMPL Logo" />
        </div>

        <div className="welcome-content">
          <h5>WELCOME TO UMPL</h5>
          <h2>Uganda Media Presenters League</h2>
          <p>
            The Uganda Media Presenters League (UMPL) is a professional
            association that brings together media presenters from television,
            radio, digital media and other communication platforms across
            Uganda. UMPL promotes professionalism, unity, innovation and
            collaboration among media practitioners while contributing to the
            growth of Uganda's media industry.
          </p>
        </div>
      </div>
    </section>
  );
}

function Sacco() {
  return (
    <section className="sacco">
      <div className="sacco-container">
        <div className="section-header">
          <h5>MEMBER BENEFITS</h5>
          <h2>Media Presenters Fraternity Members SACCO</h2>
          <p>
            A dedicated savings and credit cooperative society designed exclusively for UMPL members to provide financial security, investment opportunities, and mutual support within our media presenters community.
          </p>
        </div>

        <div className="sacco-grid">
          {saccoServices.map((service, index) => (
            <div className="sacco-card" key={index}>
              <div className="sacco-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="sacco-benefit">
          <div className="sacco-benefit-content">
            <h3>Why Join Our SACCO?</h3>
            <ul>
              <li>✓ Build personal wealth through disciplined savings</li>
              <li>✓ Access emergency loans with flexible repayment terms</li>
              <li>✓ Benefit from collective purchasing power and discounts</li>
              <li>✓ Secure your family's future with group insurance schemes</li>
              <li>✓ Network and collaborate with fellow media professionals</li>
              <li>✓ Participate in dividends from SACCO profits</li>
            </ul>
          </div>
          <div className="sacco-benefit-image">
            <div className="sacco-image-placeholder">
              <div className="placeholder-text">
                <span>💎</span>
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
