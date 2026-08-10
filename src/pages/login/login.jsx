import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  return (
    <section className="login-page">

      <div className="login-card">

        <img
          src="/logo.jpeg"
          alt="UMPL Logo"
          className="login-logo"
        />

        <h2>Administrator Login</h2>

        <p>
          Sign in to manage the Uganda Media Presenters League website.
        </p>

        <form>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <button>
            Login
          </button>

        </form>

      </div>

    </section>
  );
}

export default Login;