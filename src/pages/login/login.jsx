import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import authService from "../../Services/authService";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

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

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

      </div>

    </section>
  );
}

export default Login;