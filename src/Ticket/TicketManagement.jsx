import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/api/tickets', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTickets(res.data))
      .catch(err => console.error('Ticket fetch error:', err));
  }, [token]);

  useEffect(() => {
    let updated = [...tickets];

    if (statusFilter) {
      updated = updated.filter(ticket => ticket.status === statusFilter);
    }
    if (departmentFilter) {
      updated = updated.filter(ticket => ticket.department === departmentFilter);
    }

    setFilteredTickets(updated);
  }, [statusFilter, departmentFilter, tickets]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Ticket Management</h2>

      {/* Filters */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
          <option value="">Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Support">Support</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Ticket List */}
      {filteredTickets.length > 0 ? (
        filteredTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} token={token} />
        ))
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

// Card to display each ticket
const TicketCard = ({ ticket, token }) => {
  const [latestReply, setLatestReply] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/tickets/${ticket.id}/reply`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const replies = res.data;
        if (replies.length > 0) {
          setLatestReply(replies[replies.length - 1].message);
        }
      })
      .catch(err => console.error('Reply fetch error:', err));
  }, [ticket.id, token]);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px'
    }}>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Department:</strong> {ticket.department}</p>
      <p><strong>User Message:</strong> {ticket.description}</p>
      
    </div>
  );
};

export default TicketManagement;
