import "./contact.css";
import { useState, useEffect } from "react";
import settingsService from "../../Services/settingsService";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Contact() {
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
    <section className="contact-page">

      <div className="contact-banner">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out to us using the details below or
          send us a message to connect with Uganda's media presenters community.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-box">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Address</h3>
              <p>Plot 2 Corporation Rise<br/>P.O.Box 3156, Kampala, Uganda</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+256 774 144 527<br/>+256 702 989 473</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>ugandamediapresentersleague@gmail.com</p>
            </div>
          </div>

          <h3 className="follow-title">Follow Us</h3>

          <div className="social-icons">
            {socialMedia.facebook_url && (
              <a href={socialMedia.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
            )}
            
            {socialMedia.instagram_url && (
              <a href={socialMedia.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            
            {socialMedia.twitter_url && (
              <a href={socialMedia.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
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

            {/* Show message when no social links are available */}
            {!socialMedia.facebook_url && !socialMedia.twitter_url && !socialMedia.instagram_url && 
             !socialMedia.linkedin_url && !socialMedia.youtube_url && (
              <p className="social-placeholder">Social media links will be available through admin dashboard</p>
            )}
          </div>

          <div className="office-hours">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

        </div>

        <div className="contact-form">

          <h2>Send Us a Message</h2>
          
          <p className="form-description">
            Whether you're a media presenter looking to join UMPL or have questions about our services, we're here to help.
          </p>

          <form>

            <input
              type="text"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number (Optional)"
            />

            <select>
              <option value="">Select Inquiry Type</option>
              <option value="membership">Membership Inquiry</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="training">Training & Workshops</option>
              <option value="media">Media & Press</option>
              <option value="general">General Question</option>
            </select>

            <input
              type="text"
              placeholder="Subject"
              required
            />

            <textarea
              rows="6"
              placeholder="Write your message here..."
              required
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;