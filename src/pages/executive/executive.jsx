import { useState, useEffect } from "react";
import { resolveMediaUrl } from "../../Services/uploadService";
import "./executive.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

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
      } catch (err) {
        console.error("Failed to fetch team:", err);
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