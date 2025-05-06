import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const TicketDetail = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTicket()
  }, [])

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTicket(res.data)
    } catch {
      setError('Failed to load ticket.')
    }
  }

  const handleReplySubmit = async e => {
    e.preventDefault()
    if (!reply.trim()) return
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `/api/tickets/${id}/reply`,
        { message: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReply('')
      fetchTicket()
    } catch {
      setError('Could not send reply.')
    }
  }

  if (!ticket) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <h2 className="text-2xl font-semibold mb-2">{ticket.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {ticket.status} · {ticket.priority} · {ticket.department}
      </p>
      <p className="mb-6">{ticket.description}</p>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Conversation</h3>
        <div className="space-y-4">
          {ticket.replies?.map(r => (
            <div
              key={r.id}
              className={`p-3 rounded ${
                r.userId === ticket.userId ? 'bg-gray-100' : 'bg-blue-50'
              }`}
            >
              <p className="text-sm"><strong>{r.userName}</strong> <span className="text-gray-500 text-xs">({new Date(r.timestamp).toLocaleString()})</span></p>
              <p className="mt-1">{r.message}</p>
            </div>
          )) || <p>No replies yet.</p>}
        </div>
      </div>

      <form onSubmit={handleReplySubmit} className="space-y-4">
        <textarea
          value={reply}
          onChange={e => setReply(e.target.value)}
          rows={3}
          placeholder="Type your reply..."
          className="w-full border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Send Reply
        </button>
      </form>
    </div>
  )
}

export default TicketDetail
