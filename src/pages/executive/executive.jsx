import { useState, useEffect } from "react";
import { resolveMediaUrl } from "../../Services/uploadService";
import "./executive.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// Fallback data shown when the backend is unavailable
const FALLBACK_MEMBERS = [
  {
    id: 1,
    name: "Mbabaali Maliseeri",
    position: "Chairperson",
    image: "/chairman.jpeg",
    paragraph: "I am committed to fostering a culture of professionalism, unity, and excellence among media presenters in Uganda.",
  },
  {
    id: 2,
    name: "Ndawula Peter Simon",
    position: "Vice Chairman",
    image: "/vice chairman.jpeg",
    paragraph: "I support the Chairperson in promoting professionalism and ethical conduct. I focus on creating opportunities for capacity building and collaboration across the media industry.",
  },
  {
    id: 3,
    name: "Nalugwa Connie",
    position: "Treasurer",
    image: "/treasurer.jpeg",
    paragraph: "I manage the association's financial resources with transparency and accountability, supporting our initiatives and contributing to sustainable growth.",
  },
  {
    id: 4,
    name: "Nabukenya Lilian",
    position: "Secretary",
    image: "/Secretary.jpeg",
    paragraph: "I maintain effective communication and organization within our association. I ensure members are informed, engaged, and supported in their professional development.",
  },
  {
    id: 5,
    name: "Ssegawa Ismael Sureman",
    position: "Publicity",
    image: "/publicity.jpeg",
    paragraph: "I promote our association and its activities to the public and media, ensuring our message is clearly communicated and our visibility grows.",
  },
];

function Executive() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_URL}/team`);
        if (res.ok) {
          const data = await res.json();
          const teamList = data.team_members || data;
          if (teamList && teamList.length > 0) {
            // Map the API fields to the format expected by the component
            const formatted = teamList.map(member => ({
              id: member.id,
              name: member.full_name,
              position: member.position,
              image: member.photo_url,
              paragraph: member.bio,
            }));
            setMembers(formatted);
            return;
          }
        }
        // API returned no data — use fallback
        setMembers(FALLBACK_MEMBERS);
      } catch (err) {
        console.error("Failed to fetch team:", err);
        // Network error — use fallback so images still display
        setMembers(FALLBACK_MEMBERS);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);
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
          <div className="member-card" key={member.id || index}>
            <img src={resolveMediaUrl(member.image)} alt={member.name} />
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