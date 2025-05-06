import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
      priority,
      department,
    };

    const token = sessionStorage.getItem('jwtToken'); 

    if (!token) {
      alert('You need to log in first!');
      navigate('/login');
      return;
    }

    try {
      
      const response = await axios.post(
        'http://localhost:8080/api/tickets', 
        ticketData, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200) {
        alert('Ticket submitted successfully!');
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Failed to submit ticket. Please login again or try later.');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ textAlign: 'center', color: '#007BFF' }}>Create Ticket</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue you're facing"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Billing">Billing</option>
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
