import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/tickets', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTickets(res.data)
      } catch {
        setError('Failed to load your tickets.')
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Tickets</h1>
      <div className="space-y-4">
        {tickets.length ? (
          tickets.map(t => (
            <Link to={`/tickets/${t.id}`} key={t.id}>
              <div className="border rounded-md p-4 hover:shadow">
                <h2 className="text-lg font-medium">{t.title}</h2>
                <p className="text-sm text-gray-600">
                  {t.status} — {t.priority}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>
            No tickets found.{' '}
            <Link to="/tickets/new" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
