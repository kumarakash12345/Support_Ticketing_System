import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState({ status: '', priority: '', department: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token')
        const params = {}
        if (filter.status) params.status = filter.status
        if (filter.priority) params.priority = filter.priority
        if (filter.department) params.department = filter.department

        const res = await axios.get('/api/tickets', {
          headers: { Authorization: `Bearer ${token}` },
          params,
        })
        setTickets(res.data)
      } catch {
        setError('Failed to load tickets.')
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [filter])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['', 'Open', 'In Progress', 'Resolved', 'Closed'].map(status => (
          <select
            key={status}
            value={filter.status === status ? status : ''}
            onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
            className="border rounded px-2 py-1"
          >
            <option value="">All Statuses</option>
            {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        ))}
        {['', 'Low', 'Medium', 'High', 'Critical'].map(priority => (
          <select
            key={priority}
            value={filter.priority === priority ? priority : ''}
            onChange={e => setFilter(f => ({ ...f, priority: e.target.value }))}
            className="border rounded px-2 py-1"
          >
            <option value="">All Priorities</option>
            {['Low', 'Medium', 'High', 'Critical'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        ))}
        {['', 'IT', 'Billing', 'HR', 'Technical'].map(dept => (
          <select
            key={dept}
            value={filter.department === dept ? dept : ''}
            onChange={e => setFilter(f => ({ ...f, department: e.target.value }))}
            className="border rounded px-2 py-1"
          >
            <option value="">All Departments</option>
            {['IT', 'Billing', 'HR', 'Technical'].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {tickets.length ? (
          tickets.map(t => (
            <Link to={`/tickets/${t.id}`} key={t.id}>
              <div className="border rounded-md p-4 hover:shadow">
                <h2 className="text-lg font-medium">{t.title}</h2>
                <p className="text-sm text-gray-600">
                  {t.user.name} — {t.status} — {t.priority}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard


