import "./executive.css";

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

function Executive() {
  return (
    <section className="executive">
      <div className="section-header">
        <h5>OUR LEADERSHIP</h5>
        <h2>Executive Committee</h2>
        <p>
          Meet the leaders dedicated to promoting professionalism,
          unity and excellence among media presenters in Uganda.
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

export default Executive;