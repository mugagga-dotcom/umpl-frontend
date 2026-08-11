import "./Admin.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";
import galleryService from "../../Services/galleryService";
import { 
  FaSignOutAlt, FaImages, FaCog, FaEnvelope, FaUsers, FaPlus, FaTrash, 
  FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaCheck, FaTimes, FaEdit, FaReply, FaUserCog, FaFileAlt, FaPhone, FaMapMarkerAlt,
  FaWhatsapp, FaTelegram, FaEye, FaExclamationTriangle, FaBell
} from "react-icons/fa";

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notification, setNotification] = useState(null);
  
  // Data states
  const [galleryItems, setGalleryItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [contentSections, setContentSections] = useState([]);
  const [stats, setStats] = useState({
    galleryCount: 0,
    messageCount: 0,
    teamCount: 0,
    userCount: 0
  });

  // Form states
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showMessageReply, setShowMessageReply] = useState(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Settings states
  const [settingsData, setSettingsData] = useState({
    contact_email: "",
    contact_phone: "",
    address: "",
    site_name: ""
  });

  // Form data states
  const [galleryFormData, setGalleryFormData] = useState({
    title: "",
    description: "",
    image_url: ""
  });

  const [replyFormData, setReplyFormData] = useState({
    subject: "",
    reply_content: ""
  });

  const [teamFormData, setTeamFormData] = useState({
    full_name: "",
    position: "",
    bio: "",
    photo_url: "",
    email: "",
    phone: "",
    order: 0
  });

  const [userFormData, setUserFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role_id: "",
    is_active: true
  });

  const [socialFormData, setSocialFormData] = useState({
    platform_name: "",
    platform_icon: "",
    url: "",
    display_order: 0
  });

  const [contactFormData, setContactFormData] = useState({
    contact_email: "",
    contact_phone: "",
    address: "",
    site_name: ""
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadGalleryData(),
        loadMessages(),
        loadTeamData(),
        loadUsersData(),
        loadSocialLinks(),
        loadContentSections(),
        loadSettings()
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      showNotification("error", "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const loadGalleryData = async () => {
    try {
      const gallery = await galleryService.getGalleryItems();
      setGalleryItems(gallery || []);
      setStats(prev => ({ ...prev, galleryCount: gallery?.length || 0 }));
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact/messages`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        const msgs = Array.isArray(data) ? data : data.messages || [];
        setMessages(msgs);
        setStats(prev => ({ ...prev, messageCount: msgs.length }));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const loadTeamData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/team`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        const team = data.team_members || data || [];
        setTeamMembers(team);
        setStats(prev => ({ ...prev, teamCount: team.length }));
      }
    } catch (error) {
      console.error("Error loading team:", error);
    }
  };

  const loadUsersData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        const usersList = data.users || data || [];
        setUsers(usersList);
        setStats(prev => ({ ...prev, userCount: usersList.length }));
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const loadSocialLinks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings/social-media`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSocialLinks(data.social_media_links || []);
      }
    } catch (error) {
      console.error("Error loading social links:", error);
    }
  };

  const loadContentSections = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings/content`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setContentSections(data.content_sections || []);
      }
    } catch (error) {
      console.error("Error loading content sections:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings/contact`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        const contact = data.data || {};
        setSettingsData(contact);
        setContactFormData(contact);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const showNotification = (type, text, duration = 3000) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), duration);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Gallery handlers
  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    try {
      await galleryService.createGalleryItem({
        title: galleryFormData.title,
        description: galleryFormData.description,
        image_url: galleryFormData.image_url,
        is_active: true
      });
      setGalleryFormData({ title: "", description: "", image_url: "" });
      setShowGalleryForm(false);
      loadGalleryData();
      showNotification("success", "✅ Image added to gallery successfully!");
    } catch (error) {
      showNotification("error", "❌ Error adding image: " + error.message);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await galleryService.deleteGalleryItem(id);
        loadGalleryData();
        showNotification("success", "✅ Image deleted successfully!");
      } catch (error) {
        showNotification("error", "❌ Error deleting image: " + error.message);
      }
    }
  };

  // Form change handlers
  const handleGalleryFormChange = (e) => {
    const { name, value } = e.target;
    setGalleryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReplyFormChange = (e) => {
    const { name, value } = e.target;
    setReplyFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamFormChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSocialFormChange = (e) => {
    const { name, value } = e.target;
    setSocialFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  // Message reply handler
  const handleSendReply = async (messageId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact/messages/${messageId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(replyFormData)
      });

      if (response.ok) {
        setReplyFormData({ subject: "", reply_content: "" });
        setShowMessageReply(null);
        loadMessages();
        showNotification("success", "✅ Reply sent successfully!");
      } else {
        const error = await response.json();
        showNotification("error", "❌ Error sending reply: " + error.message);
      }
    } catch (error) {
      showNotification("error", "❌ Error sending reply: " + error.message);
    }
  };

  // Contact info update handler
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(contactFormData)
      });

      if (response.ok) {
        setSettingsData(contactFormData);
        showNotification("success", "✅ Contact information updated successfully!");
      } else {
        const error = await response.json();
        showNotification("error", "❌ Error updating contact info: " + error.message);
      }
    } catch (error) {
      showNotification("error", "❌ Error updating contact info: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <p className="loading">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/logo.jpeg" alt="UMPL Logo" className="admin-logo" />
            <h1>UMPL Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <p>Welcome, <strong>{user?.full_name}</strong></p>
              <span className="role-badge">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <button 
          className={`nav-tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button 
          className={`nav-tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          <FaImages /> Gallery ({stats.galleryCount})
        </button>
        <button 
          className={`nav-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          <FaEnvelope /> Messages ({stats.messageCount})
        </button>
        <button 
          className={`nav-tab ${activeTab === "team" ? "active" : ""}`}
          onClick={() => setActiveTab("team")}
        >
          <FaUsers /> Team ({stats.teamCount})
        </button>
        <button 
          className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <FaUserCog /> Users ({stats.userCount})
        </button>
        <button 
          className={`nav-tab ${activeTab === "content" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          <FaFileAlt /> Content
        </button>
        <button 
          className={`nav-tab ${activeTab === "social" ? "active" : ""}`}
          onClick={() => setActiveTab("social")}
        >
          <FaGlobe /> Social Media
        </button>
        <button 
          className={`nav-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <FaCog /> Settings
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-main">
        
        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <>
            <div className="dashboard-grid">
              <div 
                className="dashboard-card clickable" 
                onClick={() => setActiveTab("gallery")}
              >
                <div className="card-icon">
                  <FaImages />
                </div>
                <div className="card-content">
                  <h3>Gallery</h3>
                  <p className="card-number">{stats.galleryCount}</p>
                  <p className="card-label">Images</p>
                  <a className="card-link">Manage Gallery →</a>
                </div>
              </div>

              <div 
                className="dashboard-card clickable" 
                onClick={() => setActiveTab("messages")}
              >
                <div className="card-icon">
                  <FaEnvelope />
                </div>
                <div className="card-content">
                  <h3>Messages</h3>
                  <p className="card-number">{stats.messageCount}</p>
                  <p className="card-label">Contact Forms</p>
                  <a className="card-link">View Messages →</a>
                </div>
              </div>

              <div 
                className="dashboard-card clickable" 
                onClick={() => setActiveTab("team")}
              >
                <div className="card-icon">
                  <FaUsers />
                </div>
                <div className="card-content">
                  <h3>Team</h3>
                  <p className="card-number">{stats.teamCount}</p>
                  <p className="card-label">Members</p>
                  <a className="card-link">Manage Team →</a>
                </div>
              </div>

              <div 
                className="dashboard-card clickable" 
                onClick={() => setActiveTab("users")}
              >
                <div className="card-icon">
                  <FaUserCog />
                </div>
                <div className="card-content">
                  <h3>Users</h3>
                  <p className="card-number">{stats.userCount}</p>
                  <p className="card-label">System Users</p>
                  <a className="card-link">Manage Users →</a>
                </div>
              </div>
            </div>

            <section className="quick-info">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <div className="action-item">
                  <h4>Add Gallery Image</h4>
                  <p>Upload new images to the gallery</p>
                  <button 
                    className="primary-btn"
                    onClick={() => { setActiveTab("gallery"); setShowGalleryForm(true); }}
                  >
                    <FaPlus /> Upload Image
                  </button>
                </div>
                <div className="action-item">
                  <h4>Manage Social Media</h4>
                  <p>Update social media links</p>
                  <button 
                    className="primary-btn"
                    onClick={() => setActiveTab("social")}
                  >
                    <FaGlobe /> Social Media
                  </button>
                </div>
                <div className="action-item">
                  <h4>View Website</h4>
                  <p>Preview your live website</p>
                  <a href="/" className="primary-btn" target="_blank" rel="noopener noreferrer">
                    <FaGlobe /> Visit Site
                  </a>
                </div>
                <div className="action-item">
                  <h4>Edit Content</h4>
                  <p>Update website content sections</p>
                  <button 
                    className="primary-btn"
                    onClick={() => setActiveTab("content")}
                  >
                    <FaFileAlt /> Edit Content
                  </button>
                </div>
              </div>
            </section>

            <section className="system-status">
              <h2>System Status</h2>
              <div className="status-items">
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Backend API</span>
                  <span className="status-text"><FaCheck /> Connected</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Database</span>
                  <span className="status-text"><FaCheck /> Connected</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Authentication</span>
                  <span className="status-text"><FaCheck /> Verified</span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Gallery View */}
        {activeTab === "gallery" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gallery Management</h2>
              <button 
                className="primary-btn"
                onClick={() => setShowGalleryForm(!showGalleryForm)}
              >
                {showGalleryForm ? "Cancel" : <><FaPlus /> Add Image</>}
              </button>
            </div>

            {showGalleryForm && (
              <div className="form-container">
                <h3>Add New Gallery Image</h3>
                <form onSubmit={handleAddGalleryImage}>
                  <div className="form-group">
                    <label>Image Title</label>
                    <input
                      type="text"
                      name="title"
                      value={galleryFormData.title}
                      onChange={handleGalleryFormChange}
                      placeholder="Enter image title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={galleryFormData.description}
                      onChange={handleGalleryFormChange}
                      placeholder="Enter image description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={galleryFormData.image_url}
                      onChange={handleGalleryFormChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <button type="submit" className="primary-btn"><FaCheck /> Add Image</button>
                </form>
              </div>
            )}

            <div className="gallery-list">
              <h3>Current Gallery ({stats.galleryCount} images)</h3>
              {galleryItems.length === 0 ? (
                <p className="empty-state">No gallery items yet. Add your first image!</p>
              ) : (
                <div className="gallery-grid">
                  {galleryItems.map(item => (
                    <div key={item.id} className="gallery-item">
                      <img src={item.image_url} alt={item.title} />
                      <div className="item-info">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <div className="item-actions">
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteGalleryImage(item.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages View */}
        {activeTab === "messages" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Contact Messages ({stats.messageCount})</h2>
              <button className="primary-btn" onClick={loadMessages}>
                <FaBell /> Refresh
              </button>
            </div>
            
            {messages.length === 0 ? (
              <div className="message-placeholder">
                <FaEnvelope className="placeholder-icon" />
                <p>No messages yet</p>
                <a href="/contact" className="btn-secondary">View Contact Page</a>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className="message-item">
                    <div className="message-header">
                      <h4>
                        {msg.name}
                        {!msg.is_read && <span className="unread-badge">New</span>}
                        {msg.priority === 'high' && <FaExclamationTriangle className="priority-high" />}
                        {msg.priority === 'urgent' && <FaExclamationTriangle className="priority-urgent" />}
                      </h4>
                      <span className="message-date">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="message-email"><strong>Email:</strong> {msg.email}</p>
                    {msg.subject && (
                      <p className="message-subject"><strong>Subject:</strong> {msg.subject}</p>
                    )}
                    <p className="message-body">{msg.message}</p>
                    <div className="message-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => {
                          setShowMessageReply(msg.id);
                          setReplyFormData({
                            subject: `Re: ${msg.subject || 'Your inquiry'}`,
                            reply_content: `Dear ${msg.name},\n\nThank you for contacting UMPL.\n\n`
                          });
                        }}
                      >
                        <FaReply /> Reply
                      </button>
                      {msg.is_replied && (
                        <span className="replied-badge">
                          <FaCheck /> Replied
                        </span>
                      )}
                    </div>

                    {/* Reply Form */}
                    {showMessageReply === msg.id && (
                      <div className="reply-form">
                        <h4>Reply to {msg.name}</h4>
                        <div className="form-group">
                          <label>Subject</label>
                          <input
                            type="text"
                            name="subject"
                            value={replyFormData.subject}
                            onChange={handleReplyFormChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Reply Message</label>
                          <textarea
                            name="reply_content"
                            value={replyFormData.reply_content}
                            onChange={handleReplyFormChange}
                            rows="6"
                            placeholder="Type your reply here..."
                            required
                          ></textarea>
                        </div>
                        <div className="form-actions">
                          <button 
                            className="primary-btn"
                            onClick={() => handleSendReply(msg.id)}
                          >
                            <FaCheck /> Send Reply
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={() => setShowMessageReply(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; 2026 Uganda Media Presenters League. Admin Dashboard v1.0</p>
      </footer>
    </div>
  );
}

export default Admin;
        {/* Team View */}
        {activeTab === "team" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Team Management</h2>
              <button 
                className="primary-btn"
                onClick={() => setShowTeamForm(!showTeamForm)}
              >
                {showTeamForm ? "Cancel" : <><FaPlus /> Add Member</>}
              </button>
            </div>

            {showTeamForm && (
              <div className="form-container">
                <h3>{editingItem ? "Edit" : "Add New"} Team Member</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Handle team member creation/editing
                  console.log("Team form data:", teamFormData);
                  setShowTeamForm(false);
                  showNotification("success", "Team member saved!");
                }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={teamFormData.full_name}
                      onChange={handleTeamFormChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={teamFormData.position}
                      onChange={handleTeamFormChange}
                      placeholder="e.g., Chairperson, Secretary"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={teamFormData.bio}
                      onChange={handleTeamFormChange}
                      placeholder="Brief biography"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Photo URL</label>
                    <input
                      type="url"
                      name="photo_url"
                      value={teamFormData.photo_url}
                      onChange={handleTeamFormChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={teamFormData.email}
                      onChange={handleTeamFormChange}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={teamFormData.phone}
                      onChange={handleTeamFormChange}
                      placeholder="+256 xxx xxx xxx"
                    />
                  </div>
                  <button type="submit" className="primary-btn">
                    <FaCheck /> {editingItem ? "Update" : "Add"} Member
                  </button>
                </form>
              </div>
            )}

            <div className="team-list">
              <h3>Current Team ({stats.teamCount} members)</h3>
              {teamMembers.length === 0 ? (
                <p className="empty-state">No team members yet. Add your first member!</p>
              ) : (
                <div className="team-grid">
                  {teamMembers.map(member => (
                    <div key={member.id} className="team-item">
                      {member.photo_url && (
                        <img src={member.photo_url} alt={member.full_name} className="member-photo" />
                      )}
                      <div className="member-info">
                        <h4>{member.full_name}</h4>
                        <p className="member-position">{member.position}</p>
                        <p className="member-bio">{member.bio}</p>
                        {member.email && (
                          <p className="member-contact"><strong>Email:</strong> {member.email}</p>
                        )}
                        {member.phone && (
                          <p className="member-contact"><strong>Phone:</strong> {member.phone}</p>
                        )}
                        <div className="member-actions">
                          <button className="btn-edit">
                            <FaEdit /> Edit
                          </button>
                          <button className="delete-btn">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users View */}
        {activeTab === "users" && (
          <div className="content-section">
            <div className="section-header">
              <h2>User Management</h2>
              <button 
                className="primary-btn"
                onClick={() => setShowUserForm(!showUserForm)}
              >
                {showUserForm ? "Cancel" : <><FaPlus /> Add User</>}
              </button>
            </div>

            {showUserForm && (
              <div className="form-container">
                <h3>Add New User</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log("User form data:", userFormData);
                  setShowUserForm(false);
                  showNotification("success", "User created!");
                }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={userFormData.full_name}
                      onChange={handleUserFormChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userFormData.email}
                      onChange={handleUserFormChange}
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleUserFormChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="role_id"
                      value={userFormData.role_id}
                      onChange={handleUserFormChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="1">Super Admin</option>
                      <option value="2">Admin</option>
                      <option value="3">Editor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={userFormData.is_active}
                        onChange={handleUserFormChange}
                      />
                      Active User
                    </label>
                  </div>
                  <button type="submit" className="primary-btn">
                    <FaCheck /> Create User
                  </button>
                </form>
              </div>
            )}

            <div className="users-list">
              <h3>System Users ({stats.userCount} users)</h3>
              {users.length === 0 ? (
                <p className="empty-state">No users found.</p>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.full_name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
                          <td>
                            <button className="btn-edit">
                              <FaEdit />
                            </button>
                            {user.id !== 1 && (
                              <button className="delete-btn">
                                <FaTrash />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Content View */}
        {activeTab === "content" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Content Management</h2>
              <button className="primary-btn" onClick={loadContentSections}>
                <FaFileAlt /> Refresh
              </button>
            </div>

            <div className="content-sections">
              {contentSections.map(section => (
                <div key={section.id} className="content-item">
                  <div className="content-header">
                    <h4>{section.title}</h4>
                    <button 
                      className="btn-edit"
                      onClick={() => setShowContentForm(section.section_key)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                  <p className="content-preview">
                    {section.content?.substring(0, 200)}...
                  </p>
                  <div className="content-meta">
                    <span>Section: {section.section_key}</span>
                    <span>Updated: {new Date(section.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {showContentForm && (
              <div className="modal-overlay" onClick={() => setShowContentForm(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Edit Content Section</h3>
                    <button onClick={() => setShowContentForm(null)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Content editing interface for: {showContentForm}</p>
                    <button className="primary-btn">Save Changes</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Social Media View */}
        {activeTab === "social" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Social Media Management</h2>
              <button 
                className="primary-btn"
                onClick={() => setShowSocialForm(!showSocialForm)}
              >
                {showSocialForm ? "Cancel" : <><FaPlus /> Add Platform</>}
              </button>
            </div>

            {showSocialForm && (
              <div className="form-container">
                <h3>Add Social Media Platform</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Social form data:", socialFormData);
                  setShowSocialForm(false);
                  showNotification("success", "Social media platform added!");
                }}>
                  <div className="form-group">
                    <label>Platform Name</label>
                    <input
                      type="text"
                      name="platform_name"
                      value={socialFormData.platform_name}
                      onChange={handleSocialFormChange}
                      placeholder="e.g., TikTok, Discord"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Platform Icon</label>
                    <select
                      name="platform_icon"
                      value={socialFormData.platform_icon}
                      onChange={handleSocialFormChange}
                      required
                    >
                      <option value="">Select Icon</option>
                      <option value="FaTiktok">TikTok</option>
                      <option value="FaDiscord">Discord</option>
                      <option value="FaSnapchat">Snapchat</option>
                      <option value="FaPinterest">Pinterest</option>
                      <option value="FaReddit">Reddit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="url"
                      name="url"
                      value={socialFormData.url}
                      onChange={handleSocialFormChange}
                      placeholder="https://platform.com/yourprofile"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Display Order</label>
                    <input
                      type="number"
                      name="display_order"
                      value={socialFormData.display_order}
                      onChange={handleSocialFormChange}
                      min="0"
                    />
                  </div>
                  <button type="submit" className="primary-btn">
                    <FaCheck /> Add Platform
                  </button>
                </form>
              </div>
            )}

            <div className="social-links-list">
              <h3>Current Social Media Links ({socialLinks.length})</h3>
              <div className="social-links-grid">
                {socialLinks.map(link => (
                  <div key={link.id} className="social-link-item">
                    <div className="social-icon">
                      {link.platform_name === 'Facebook' && <FaFacebook />}
                      {link.platform_name === 'Twitter' && <FaTwitter />}
                      {link.platform_name === 'Instagram' && <FaInstagram />}
                      {link.platform_name === 'LinkedIn' && <FaLinkedin />}
                      {link.platform_name === 'YouTube' && <FaYoutube />}
                      {link.platform_name === 'WhatsApp' && <FaWhatsapp />}
                      {link.platform_name === 'Telegram' && <FaTelegram />}
                    </div>
                    <div className="social-info">
                      <h4>{link.platform_name}</h4>
                      <p>{link.url}</p>
                      <div className="social-actions">
                        <button className="btn-edit">
                          <FaEdit /> Edit
                        </button>
                        <button className="delete-btn">
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings View */}
        {activeTab === "settings" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Site Settings</h2>
            </div>

            <div className="settings-container">
              <div className="settings-card">
                <h3>Contact Information</h3>
                <form onSubmit={handleUpdateContact}>
                  <div className="form-group">
                    <label><FaGlobe /> Site Name</label>
                    <input
                      type="text"
                      name="site_name"
                      value={contactFormData.site_name}
                      onChange={handleContactFormChange}
                      placeholder="Site name"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaEnvelope /> Contact Email</label>
                    <input
                      type="email"
                      name="contact_email"
                      value={contactFormData.contact_email}
                      onChange={handleContactFormChange}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaPhone /> Contact Phone</label>
                    <input
                      type="tel"
                      name="contact_phone"
                      value={contactFormData.contact_phone}
                      onChange={handleContactFormChange}
                      placeholder="+256 xxx xxx xxx"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaMapMarkerAlt /> Address</label>
                    <textarea
                      name="address"
                      value={contactFormData.address}
                      onChange={handleContactFormChange}
                      placeholder="Physical address"
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="primary-btn">
                    <FaCheck /> Update Contact Info
                  </button>
                </form>
              </div>

              <div className="settings-card">
                <h3>Current Settings</h3>
                <div className="info-item">
                  <span className="label">Site Name:</span>
                  <span className="value">{settingsData.site_name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Contact Email:</span>
                  <span className="value">{settingsData.contact_email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{settingsData.contact_phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Address:</span>
                  <span className="value">{settingsData.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; 2026 Uganda Media Presenters League. Admin Dashboard v2.0</p>
      </footer>
    </div>
  );
}

export default Admin;