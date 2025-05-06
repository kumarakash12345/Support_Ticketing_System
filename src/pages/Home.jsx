import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || user.username);
    }
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Support Ticketing System</h2>
        <div>
          <button
            onClick={() => navigate('/dashboard')} 
            style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '16px' }}
          >
            My Dashboard
          </button>

          <button
            onClick={() => navigate('/ticketform')}
            style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '16px' }}
          >
            Add Ticket
          </button>

          <button
            onClick={() => navigate('/ticketdetail')} 
            style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '16px' }}
          >
            My Ticket
          </button>
        </div>
      </nav>

      {/* Welcome */}
      <div style={{ padding: '20px' }}>
        <h2>Welcome Back {userName}</h2>
      </div>
    </div>
  );
};

export default Home;
