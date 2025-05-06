import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Import the decoder

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      const { token } = response.data;

      sessionStorage.setItem('jwtToken', token);

      // ✅ Decode token to get role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      sessionStorage.setItem('userRole', role);

      alert('Login successful!');

      // ✅ Navigate based on role
      if (role === 'ADMIN') {
        navigate('/admindashboard');
      } else if (role === 'USER') {
        navigate('/home');
       // default fallback
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'pink', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ fontFamily: 'inherit', textAlign: 'center', marginBottom: '30px' }}>HelpDesk Ticketing System</h1>
      <div className="auth-container">
        <h1>Login</h1>

        {location.state?.message && (
          <div className="success-message">{location.state.message}</div>
        )}

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <button className="link-button" onClick={() => navigate('/register')}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
