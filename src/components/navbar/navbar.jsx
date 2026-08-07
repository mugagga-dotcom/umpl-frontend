import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <img src="/logo.jpeg" alt="UMPL Logo" />
          <h2>UMPL</h2>
        </div>

        <nav>
          <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/about">About Us</Link></li>
  <li><Link to="/vision">Strategy</Link></li>
  <li><Link to="/executive">Executive Committee</Link></li>
  <li><Link to="/gallery">Gallery</Link></li>
  <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <Link to="/login" className="login-btn">Login</Link>

      </div>
    </header>
  );
}

export default Navbar;