import "./Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 */}

        <div className="footer-box">

          <img src="/logo.jpeg" alt="UMPL Logo" className="footer-logo" />

          <h2>Uganda Media Presenters League</h2>

          <p>
            Uniting, empowering and promoting professionalism among media
            presenters across Uganda.
          </p>

        </div>

        {/* Column 2 */}

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="/">Home</a></li>
    
            <li><a href="/about">About UMPL</a></li>

            <li><a href="/vision"></a>Strategy</li>

            <li><a href="/executive">Executive Committee</a></li>

            <li><a href="/contact">Contact Us</a></li>

          </ul>

        </div>

        {/* Column 3 */}

        <div className="footer-box">

          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt className="footer-icon" />
           Plot 2 Cropration Rise
          </p>

          <p>
            <FaPhone className="footer-icon" />
            +256 774 144 527 <br/>
            +256 702 989 473 
          </p>

          <p>
            <FaEnvelope className="footer-icon" />
            P.O.Box3156 , Kampala, Uganda
            ugandamediapresenterleague@gmail.com
          </p>

        </div>

        {/* Column 4 */}

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaTwitter /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaLinkedinIn /></a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Uganda Media Presenters League. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;