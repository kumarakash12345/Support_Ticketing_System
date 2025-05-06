import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TicketForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    department: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { title, description, priority, department } = formData
    if (!title || !description || !priority || !department) {
      setError('All fields are required.')
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        '/api/tickets',
        { title, description, priority, department },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/tickets')
    } catch {
      setError('Could not create ticket.')
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-8">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">
        Create New Ticket
      </h3>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Department</option>
            <option>IT</option>
            <option>Billing</option>
            <option>HR</option>
            <option>Technical</option>
          </select>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Ticket
        </button>
      </form>
    </div>
  )
}

export default TicketForm
