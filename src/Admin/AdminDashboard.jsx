import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || user.username);
    }

    const fetchTickets = async () => {
      const token = sessionStorage.getItem('jwtToken');
      try {
        const response = await axios.get('http://localhost:8080/api/tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    const token = sessionStorage.getItem('jwtToken');
    const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
      alert('Ticket deleted successfully.');
    } catch (err) {
      console.error('Error deleting ticket:', err.response?.data || err.message);
    }
  };

  const updateTicketStatusAndPriority = async (ticketId, status, priority) => {
    const token = sessionStorage.getItem('jwtToken');
    try {
      const response = await axios.put(
        `http://localhost:8080/api/tickets/${ticketId}/status-priority`,
        null,
        {
          params: { status, priority },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const updatedTicket = response.data;
      setTickets(prev =>
        prev.map(ticket => (ticket.id === ticketId ? updatedTicket : ticket))
      );
    } catch (err) {
      console.error('Error updating status/priority:', err);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    (filters.status === '' || ticket.status === filters.status) &&
    (filters.department === '' || ticket.department === filters.department) &&
    (filters.priority === '' || ticket.priority === filters.priority) &&
    (filters.search === '' ||
      ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.id.toString().includes(filters.search))
  );

  const countByStatus = (status) =>
    filteredTickets.filter(ticket => ticket.status === status).length;

  const pieData = {
    labels: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
    datasets: [
      {
        data: [
          countByStatus('OPEN'),
          countByStatus('IN_PROGRESS'),
          countByStatus('CLOSED')
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#2F92E6', '#F0C94C', '#FF4A6B']
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: '15px' }}>WELCOME  {userName}</span>
          <button
            onClick={() => {
              sessionStorage.removeItem('jwtToken');
              window.location.reload();
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ width: '300px', margin: '20px auto' }}>
        <Pie data={pieData} />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Billing">Billing</option>
          <option value="Technical">Technical</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All Priorities</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
        <input
          type="text"
          placeholder="Search tickets..."
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          style={{ flexGrow: 1 }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>User</th>
              <th style={{ padding: '12px' }}>Department</th>
              <th style={{ padding: '12px' }}>Priority</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{ticket.id}</td>
                <td style={{ padding: '12px' }}>
                  <Link to={`/ticket-detail/${ticket.id}`}>{ticket.title}</Link>
                </td>
                <td style={{ padding: '12px' }}>
                  {ticket.user?.name || ticket.user?.email || 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>{ticket.department}</td>
                <td style={{ padding: '12px' }}>
                  <select
                    value={ticket.priority}
                    onChange={(e) =>
                      updateTicketStatusAndPriority(ticket.id, ticket.status, e.target.value)
                    }
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </td>
                <td style={{ padding: '12px' }}>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateTicketStatusAndPriority(ticket.id, e.target.value, ticket.priority)
                    }
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </td>
                <td style={{ padding: '12px' }}>
                  <Link to={`/ticket-detail/${ticket.id}`}>
                    <button
                      style={{
                        padding: '5px 10px',
                        marginRight: '5px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>
                  No tickets found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;