import "./footer.css";
import { useState, useEffect } from "react";
import settingsService from "../../Services/settingsService";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  const [socialMedia, setSocialMedia] = useState({
    facebook_url: null,
    twitter_url: null,
    instagram_url: null,
    linkedin_url: null,
    youtube_url: null,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await settingsService.getSettings();
        if (settings.social_media) {
          setSocialMedia(settings.social_media);
        }
      } catch (error) {
        console.error('Failed to load social media settings:', error);
      }
    };

    fetchSettings();
  }, []);

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

            <li><a href="/vision">Strategy</a></li>

            <li><a href="/executive">Executive Committee</a></li>

            <li><a href="/contact">Contact Us</a></li>

          </ul>

        </div>

        {/* Column 3 */}

        <div className="footer-box">

          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt className="footer-icon" />
           Plot 2 Corporation Rise
          </p>

          <p>
            <FaPhone className="footer-icon" />
            +256 774 144 527 <br/>
            +256 702 989 473 
          </p>

          <p>
            <FaEnvelope className="footer-icon" />
            P.O.Box3156 , Kampala, Uganda<br/>
            ugandamediapresentersleague@gmail.com
          </p>

        </div>

        {/* Column 4 */}

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social-icons">

            {socialMedia.facebook_url && (
              <a href={socialMedia.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
            )}

            {socialMedia.twitter_url && (
              <a href={socialMedia.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            )}

            {socialMedia.instagram_url && (
              <a href={socialMedia.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}

            {socialMedia.linkedin_url && (
              <a href={socialMedia.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            )}

            {socialMedia.youtube_url && (
              <a href={socialMedia.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            )}

            {/* Show placeholder message if no social media links are set */}
            {!socialMedia.facebook_url && !socialMedia.twitter_url && !socialMedia.instagram_url && 
             !socialMedia.linkedin_url && !socialMedia.youtube_url && (
              <p className="social-placeholder">Social media links will be added soon!</p>
            )}

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