

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) return;

    // Fetch ticket details
    axios.get(`http://localhost:8080/api/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTicket(res.data))
      .catch(err => console.error('Ticket fetch error:', err));

    // Fetch ticket replies
    axios.get(`http://localhost:8080/api/tickets/${id}/reply`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setReplies(res.data))
      .catch(err => console.error('Replies fetch error:', err));
  }, [id, token]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      await axios.post(
        `http://localhost:8080/api/tickets/${id}/reply`,
        newReply, // sending plain text reply
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain'
          }
        }
      );

      // Optional: Refresh replies or navigate
      navigate('/ticket');

    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Ticket Details</h2>
      <div style={{
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <p><strong>ID:</strong> {ticket.id}</p>
        <p><strong>Title:</strong> {ticket.title}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Department:</strong> {ticket.department}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Created At:</strong> {ticket.createdAt}</p>
        <p><strong>Updated At:</strong> {ticket.updatedAt}</p>
      </div>

      <h4>Post a Reply</h4>
      <form onSubmit={handleReplySubmit}>
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            marginTop: '5px'
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Send Reply
        </button>
      </form>
    </div>
  );
};

export default TicketDetail;
