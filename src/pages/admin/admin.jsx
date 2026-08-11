import "./Admin.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";
import galleryService from "../../Services/galleryService";
import { FaSignOutAlt, FaImages, FaCog, FaEnvelope, FaUsers } from "react-icons/fa";

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [galleryCount, setGalleryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    
    // Load dashboard data
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load gallery count
      const gallery = await galleryService.getGalleryItems();
      setGalleryCount(gallery.length || 0);
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

      {/* Main Content */}
      <main className="admin-main">
        <div className="dashboard-grid">
          {/* Gallery Card */}
          <div className="dashboard-card">
            <div className="card-icon">
              <FaImages />
            </div>
            <div className="card-content">
              <h3>Gallery</h3>
              <p className="card-number">{galleryCount}</p>
              <p className="card-label">Items</p>
              <a href="#gallery" className="card-link">Manage Gallery →</a>
            </div>
          </div>

          {/* Settings Card */}
          <div className="dashboard-card">
            <div className="card-icon">
              <FaCog />
            </div>
            <div className="card-content">
              <h3>Settings</h3>
              <p className="card-label">Site Configuration</p>
              <a href="#settings" className="card-link">Edit Settings →</a>
            </div>
          </div>

          {/* Contact Messages Card */}
          <div className="dashboard-card">
            <div className="card-icon">
              <FaEnvelope />
            </div>
            <div className="card-content">
              <h3>Messages</h3>
              <p className="card-label">Contact Forms</p>
              <a href="#messages" className="card-link">View Messages →</a>
            </div>
          </div>

          {/* Team Card */}
          <div className="dashboard-card">
            <div className="card-icon">
              <FaUsers />
            </div>
            <div className="card-content">
              <h3>Team</h3>
              <p className="card-label">Executive Members</p>
              <a href="#team" className="card-link">Manage Team →</a>
            </div>
          </div>
        </div>

        {/* Quick Info Section */}
        <section className="quick-info">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-item">
              <h4>Add Gallery Image</h4>
              <p>Upload new images to the gallery</p>
              <button className="action-btn">Upload Image</button>
            </div>
            <div className="action-item">
              <h4>Update Social Media</h4>
              <p>Add or update social media links</p>
              <button className="action-btn">Update Links</button>
            </div>
            <div className="action-item">
              <h4>View Website</h4>
              <p>Preview your live website</p>
              <a href="/" className="action-btn">Visit Site</a>
            </div>
          </div>
        </section>

        {/* System Status */}
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
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; 2026 Uganda Media Presenters League. Admin Dashboard v1.0</p>
      </footer>
    </div>
  );
}

export default Admin;
