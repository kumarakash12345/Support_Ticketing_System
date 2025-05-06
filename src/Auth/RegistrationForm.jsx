import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role
          })
        });

        if (response.ok) {
          alert('Registration successful! Please login.');
          navigate('/login');
        } else {
          const data = await response.json();
          setErrors({ form: data.message || 'Registration failed. Try again.' });
        }
      } catch (error) {
        setErrors({ form: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    
    <div style={{ backgroundColor: 'pink', minHeight: '100vh', padding: '20px' }}>
      
      <h1 style={{ fontFamily: 'inherit', textAlign: 'center', marginBottom: '30px' }}>
        HelpDesk Ticketing System
      </h1>

      <div className="auth-container">
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        {errors.form && <div className="error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

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
            {errors.email && <div className="error">{errors.email}</div>}
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
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <div className="error">{errors.role}</div>}
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <button className="link-button" onClick={() => navigate('/login')}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;