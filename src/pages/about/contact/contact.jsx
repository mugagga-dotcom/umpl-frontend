import "./contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-banner">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out to us using the details below or
          send us a message.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-box">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Address</h3>
              <p>Kampala, Uganda</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+256 774 144 527 <br/> +256 702 989 473 </p>
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

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaTwitter /></a>

            <a href="#"><FaLinkedinIn /></a>

          </div>

        </div>

        <div className="contact-form">

          <h2>Send Us a Message</h2>

          <form>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
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

