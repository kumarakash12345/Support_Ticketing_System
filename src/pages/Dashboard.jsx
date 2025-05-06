import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'; 

const Home = () => {
  const [userName, setUserName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: '', department: '', status: 'Open' });
  const [filters, setFilters] = useState({ status: '', department: '', search: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || user.username);
    }

 
    const fetchTickets = async () => {
      const token = sessionStorage.getItem('jwtToken'); 

      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/tickets', {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          setTickets(response.data); 
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      } else {
        console.log('No token found. Please log in.');
      }
    };

    fetchTickets();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTickets = [...tickets, { ...newTicket, id: Date.now() }];
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    setNewTicket({ title: '', description: '', priority: '', department: '', status: 'Open' });
    alert('Submitted');
    setShowForm(false);
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (filters.status === '' || ticket.status.toLowerCase() === filters.status.toLowerCase()) &&
      (filters.department === '' || ticket.department === filters.department) &&
      (filters.search === '' || ticket.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });
  
  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Support Ticketing System</h2>
        <div>
          <button onClick={() => setShowForm(false)} style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '16px' }}>
            My Dashboard
          </button>
          <button onClick={() => setShowForm(true)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '16px' }}>
            Add Ticket
          </button>
        </div>
      </nav>

      {/* Welcome */}
      <div style={{ padding: '20px' }}>
        <h2>Welcome Back {userName}</h2>
      </div>

      {/* Ticket Form */}
      {showForm && (
        <div style={{ padding: '30px', backgroundColor: '#fff', margin: '20px auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#007BFF' }}>Book Ticket</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
            <textarea placeholder="Description" value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
            <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <select value={newTicket.department} onChange={(e) => setNewTicket({ ...newTicket, department: e.target.value })} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Billing">Billing</option>
              <option value="HR">HR</option>
              <option value="Technical">Technical</option>
            </select>
            <button type="submit" style={{ width: '100%', backgroundColor: '#007BFF', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', fontWeight: 'bold' }}>Submit Ticket</button>
          </form>
        </div>
      )}

      {/* Dashboard */}
      {!showForm && (
        <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', color: '#007BFF', marginBottom: '20px' }}>Your Submitted Tickets</h3>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={{ padding: '10px' }}>
  <option value="">All Status</option>
  <option value="OPEN">OPEN</option>
  <option value="InProgress">InProgress</option> {/* Match with backend */}
  <option value="Closed">Closed</option>
</select>

            <select onChange={(e) => setFilters({ ...filters, department: e.target.value })} style={{ padding: '10px' }}>
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="Billing">Billing</option>
              <option value="HR">HR</option>
              <option value="Technical">Technical</option>
            </select>
            <input type="text" placeholder="Search by title" onChange={(e) => setFilters({ ...filters, search: e.target.value })} style={{ padding: '10px', flexGrow: 1 }} />
          </div>

          {/* Ticket Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Title</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Priority</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Department</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <Link to={`/ticket-detail/${ticket.id}`}>{ticket.title}</Link>
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ticket.priority}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ticket.department}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ticket.status}</td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No tickets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
