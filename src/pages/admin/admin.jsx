import "./Admin.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";
import galleryService from "../../Services/galleryService";
import { FaSignOutAlt, FaImages, FaCog, FaEnvelope, FaUsers, FaTimes } from "react-icons/fa";

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [galleryCount, setGalleryCount] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: ""
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
      const gallery = await galleryService.getGalleryItems();
      setGalleryItems(gallery || []);
      setGalleryCount(gallery?.length || 0);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    try {
      await galleryService.createGalleryItem({
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        is_active: true
      });
      setFormData({ title: "", description: "", image_url: "" });
      setShowGalleryForm(false);
      loadDashboardData();
      alert("✅ Image added to gallery successfully!");
    } catch (error) {
      alert("❌ Error adding image: " + error.message);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await galleryService.deleteGalleryItem(id);
        loadDashboardData();
        alert("✅ Image deleted successfully!");
      } catch (error) {
        alert("❌ Error deleting image: " + error.message);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          <FaImages /> Gallery ({galleryCount})
        </button>
        <button 
          className={`nav-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <FaCog /> Settings
        </button>
        <button 
          className={`nav-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          <FaEnvelope /> Messages
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
                  <p className="card-number">{galleryCount}</p>
                  <p className="card-label">Items</p>
                  <a className="card-link">Manage Gallery →</a>
                </div>
              </div>

              <div 
                className="dashboard-card clickable" 
                onClick={() => setActiveTab("settings")}
              >
                <div className="card-icon">
                  <FaCog />
                </div>
                <div className="card-content">
                  <h3>Settings</h3>
                  <p className="card-label">Site Configuration</p>
                  <a className="card-link">Edit Settings →</a>
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
                  <p className="card-label">Contact Forms</p>
                  <a className="card-link">View Messages →</a>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">
                  <FaUsers />
                </div>
                <div className="card-content">
                  <h3>Team</h3>
                  <p className="card-label">Executive Members</p>
                  <a className="card-link" onClick={() => navigate("/executive")}>View Team →</a>
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
                    className="action-btn"
                    onClick={() => { setActiveTab("gallery"); setShowGalleryForm(true); }}
                  >
                    Upload Image
                  </button>
                </div>
                <div className="action-item">
                  <h4>Update Social Media</h4>
                  <p>Add or update social media links</p>
                  <button 
                    className="action-btn"
                    onClick={() => { setActiveTab("settings"); setShowSettingsForm(true); }}
                  >
                    Update Links
                  </button>
                </div>
                <div className="action-item">
                  <h4>View Website</h4>
                  <p>Preview your live website</p>
                  <a href="/" className="action-btn">Visit Site</a>
                </div>
              </div>
            </section>

            <section className="system-status">
              <h2>System Status</h2>
              <div className="status-items">
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Backend API</span>
                  <span className="status-text">Connected</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Database</span>
                  <span className="status-text">Connected</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>Authentication</span>
                  <span className="status-text">Verified</span>
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
                {showGalleryForm ? "Cancel" : "+ Add Image"}
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
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="Enter image title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Enter image description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleFormChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <button type="submit" className="primary-btn">Add Image</button>
                </form>
              </div>
            )}

            <div className="gallery-list">
              <h3>Current Gallery ({galleryCount} images)</h3>
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
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteGalleryImage(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings View */}
        {activeTab === "settings" && (
          <div className="content-section">
            <h2>Site Settings</h2>
            <div className="settings-container">
              <div className="settings-card">
                <h3>Social Media Links</h3>
                <p>Add your social media profiles to make them visible on your website:</p>
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input type="url" placeholder="https://facebook.com/yourpage" />
                </div>
                <div className="form-group">
                  <label>Twitter URL</label>
                  <input type="url" placeholder="https://twitter.com/yourpage" />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input type="url" placeholder="https://instagram.com/yourpage" />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input type="url" placeholder="https://linkedin.com/company/yourpage" />
                </div>
                <div className="form-group">
                  <label>YouTube URL</label>
                  <input type="url" placeholder="https://youtube.com/channel/yourchannel" />
                </div>
                <button className="primary-btn">Save Settings</button>
              </div>

              <div className="settings-card">
                <h3>Site Information</h3>
                <p>Current site configuration:</p>
                <div className="info-item">
                  <span className="label">Site Name:</span>
                  <span className="value">Uganda Media Presenters League (UMPL)</span>
                </div>
                <div className="info-item">
                  <span className="label">Contact Email:</span>
                  <span className="value">ugandamediapresentersleague@gmail.com</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">+256 774 144 527</span>
                </div>
                <div className="info-item">
                  <span className="label">Address:</span>
                  <span className="value">Plot 2 Corporation Rise, Kampala, Uganda</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages View */}
        {activeTab === "messages" && (
          <div className="content-section">
            <h2>Contact Messages</h2>
            <div className="messages-container">
              <p className="info-text">Messages from visitors using the contact form will appear here.</p>
              <div className="message-placeholder">
                <FaEnvelope className="placeholder-icon" />
                <p>No messages yet</p>
                <a href="/contact" className="btn-secondary">View Contact Page</a>
              </div>
            </div>
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
