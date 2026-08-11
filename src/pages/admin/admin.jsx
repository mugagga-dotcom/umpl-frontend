import "./Admin.css";

import {
  FaHome,
  FaImage,
  FaInfoCircle,
  FaBullseye,
  FaUsers,
  FaEnvelope,
  FaShareAlt,
  FaCog,
  FaSignOutAlt,
  FaImages,
  FaEdit,
} from "react-icons/fa";

function Admin() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <img src="/logo.jpeg" alt="UMPL Logo" />
          <div>
            <h2>UMPL</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">

          <a href="/admin" className="active">
            <FaHome />
            <span>Dashboard</span>
          </a>

          <a href="/admin/hero">
            <FaImage />
            <span>Hero Section</span>
          </a>

          <a href="/admin/about">
            <FaInfoCircle />
            <span>About & SACCO</span>
          </a>

          <a href="/admin/vision">
            <FaBullseye />
            <span>Vision & Objectives</span>
          </a>

          <a href="/admin/executive">
            <FaUsers />
            <span>Executive Committee</span>
          </a>

          <a href="/admin/gallery">
            <FaImages />
            <span>Gallery</span>
          </a>

          <a href="/admin/messages">
            <FaEnvelope />
            <span>Contact Messages</span>
          </a>

          <a href="/admin/social">
            <FaShareAlt />
            <span>Social Media</span>
          </a>

          <a href="/admin/settings">
            <FaCog />
            <span>Website Settings</span>
          </a>

          <a href="/login" className="logout-link">
            <FaSignOutAlt />
            <span>Logout</span>
          </a>

        </nav>

      </aside>


      {/* MAIN CONTENT */}
      <main className="admin-main">

        {/* TOP HEADER */}
        <header className="admin-header">

          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome to the Uganda Media Presenters League
              Administration Panel.
            </p>
          </div>

          <div className="admin-profile">
            <div className="profile-circle">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <small>Super Admin</small>
            </div>
          </div>

        </header>


        {/* WELCOME BANNER */}
        <section className="dashboard-welcome">

          <div>
            <span>UMPL ADMINISTRATION</span>

            <h2>
              Manage Your Website
            </h2>

            <p>
              Update your website content, executive committee,
              gallery, social media links and contact messages
              from one place.
            </p>
          </div>

          <FaEdit className="welcome-icon" />

        </section>


        {/* STATISTICS */}
        <section className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon">
              <FaUsers />
            </div>

            <div>
              <h3>5</h3>
              <p>Executive Members</p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              <FaImages />
            </div>

            <div>
              <h3>0</h3>
              <p>Gallery Photos</p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              <FaEnvelope />
            </div>

            <div>
              <h3>0</h3>
              <p>Contact Messages</p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              <FaShareAlt />
            </div>

            <div>
              <h3>0</h3>
              <p>Social Links</p>
            </div>

          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Quickly manage important website content.</p>
            </div>
          </div>


          <div className="quick-actions">

            <a href="/admin/hero">
              <FaImage />
              <span>Manage Hero</span>
            </a>

            <a href="/admin/about">
              <FaInfoCircle />
              <span>Manage About</span>
            </a>

            <a href="/admin/executive">
              <FaUsers />
              <span>Manage Executive</span>
            </a>

            <a href="/admin/gallery">
              <FaImages />
              <span>Manage Gallery</span>
            </a>

            <a href="/admin/messages">
              <FaEnvelope />
              <span>View Messages</span>
            </a>

            <a href="/admin/social">
              <FaShareAlt />
              <span>Social Media</span>
            </a>

          </div>

        </section>


        {/* RECENT ACTIVITY */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest changes and messages.</p>
            </div>
          </div>


          <div className="activity-box">

            <div className="empty-activity">

              <FaEdit />

              <h3>No Recent Activity</h3>

              <p>
                Website activity will appear here when
                administrators make changes.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Admin;