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
      <Executive />
    </>
  );
}

export default About;
