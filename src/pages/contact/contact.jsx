import "./contact.css";
import { useState, useEffect } from "react";
import settingsService from "../../Services/settingsService";
import contactService from "../../Services/contactService";
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

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    inquiry_type: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const payload = {
      name: formData.full_name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || formData.inquiry_type || 'General Inquiry',
      message: formData.message.trim()
    };

    try {
      await contactService.sendMessage(payload);
      setSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({
        full_name: '',
        email: '',
        inquiry_type: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const responseError = error.response?.data?.error || error.message;
      setErrorMessage(responseError || 'Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
            {[
              { key: 'facebook_url', icon: FaFacebookF, label: 'Facebook', class: 'facebook' },
              { key: 'twitter_url', icon: FaTwitter, label: 'Twitter', class: 'twitter' },
              { key: 'instagram_url', icon: FaInstagram, label: 'Instagram', class: 'instagram' },
              { key: 'linkedin_url', icon: FaLinkedinIn, label: 'LinkedIn', class: 'linkedin' },
              { key: 'youtube_url', icon: FaYoutube, label: 'YouTube', class: 'youtube' },
            ].map((social) => {
              const IconComponent = social.icon;
              const url = socialMedia[social.key];
              const isActive = !!url;

              return (
                <a
                  key={social.key}
                  href={url || '#'}
                  target={isActive ? '_blank' : undefined}
                  rel={isActive ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className={`social-link ${social.class} ${isActive ? 'active' : 'inactive'}`}
                  onClick={(e) => !isActive && e.preventDefault()}
                  title={isActive ? `Visit our ${social.label}` : `${social.label} link coming soon`}
                >
                  <IconComponent />
                </a>
              );
            })}
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

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <select
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleInputChange}
            >
              <option value="">Select Inquiry Type</option>
              <option value="membership">Membership Inquiry</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="training">Training & Workshops</option>
              <option value="media">Media & Press</option>
              <option value="general">General Question</option>
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;