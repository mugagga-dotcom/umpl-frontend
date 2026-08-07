import "./Executive.css";

const members = [
  {
   name: "MBABAALI MALISEERI",
    position: "Chairperson",
    image: "/chairman.jpeg",
    paragraph:
      "I am committed to fostering a culture of professionalism, unity, and excellence among media presenters in Uganda.",
  },
  {
    name: "NDAWULA PETER SIMON",
    position: "Vice Chairman",
    image: "/vice chairman.jpeg",
    paragraph:
      "I support the Chairperson in promoting professionalism and ethical conduct. I focus on creating opportunities for capacity building and collaboration across the media industry.",
  },
  {
    name: "NABUKENYA LILIAN",
    position: "Secretary",
    image: "/Secretary.jpeg",
    paragraph:
      "I maintain effective communication and organization within our association. I ensure members are informed, engaged, and supported in their professional development.",
  },
  {
    name: "NALUGWA CONNIE",
    position: "Treasurer",
    image: "/treasurer.jpeg",
    paragraph:
      "I manage the association's financial resources with transparency and accountability, supporting our initiatives and contributing to sustainable growth.",
  },
  {
    name: "SSEGAWA ISMAEL SUREMAN",
    position: "Publicity",
    image: "/publicity.jpeg",
    paragraph:
      "I promote our association and its activities to the public and media, ensuring our message is clearly communicated and our visibility grows.",
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
              <p className="member-bio">{member.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Executive;