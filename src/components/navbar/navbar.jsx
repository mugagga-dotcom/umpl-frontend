import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.jpeg" alt="UMPL Logo" />
          <h2>UMPL</h2>
        </Link>

        {/* Mobile menu button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={menuOpen ? "nav-open" : ""}>
          <ul className="nav-links">

            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" onClick={closeMenu}>
                About Us
              </Link>
            </li>

            <li>
              <Link to="/vision" onClick={closeMenu}>
                Strategy
              </Link>
            </li>

            <li>
              <Link to="/executive" onClick={closeMenu}>
                Executive Committee
              </Link>
            </li>

            <li>
              <Link to="/gallery" onClick={closeMenu}>
                Gallery
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;