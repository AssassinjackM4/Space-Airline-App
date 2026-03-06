import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function CancelFlight({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/bookings/user/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setBookings(response.data.filter(b => b.status === 'CONFIRMED'))
    } catch (err) {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}/cancel`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setSuccess('Booking cancelled successfully!')
      setTimeout(() => {
        setSuccess('')
        fetchBookings()
      }, 2000)
    } catch (err) {
      setError('Failed to cancel booking')
    }
  }

  return (
    <div className="feature-page container">
      <h1>Cancel Booking ❌</h1>
      <p className="page-subtitle">Cancel your confirmed flight bookings</p>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading">Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p className="no-results">No confirmed bookings to cancel.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="flights-list">
          <h2>Your Confirmed Bookings ({bookings.length})</h2>
          {bookings.map((booking) => (
            <div key={booking.id} className="flight-card">
              <div className="flight-route">
                <div className="airport">
                  <span className="code">{booking.departureAirport}</span>
                  <span className="time">{new Date(booking.departureTime).toLocaleString()}</span>
                </div>
                <div className="flight-info">
                  <div className="duration">
                    <div className="line"></div>
                    <span>{booking.flightNumber}</span>
                  </div>
                </div>
                <div className="airport">
                  <span className="code">{booking.arrivalAirport}</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail">
                  <span className="label">Reference:</span>
                  <span className="value">{booking.bookingReference}</span>
                </div>
                <div className="detail">
                  <span className="label">Passengers:</span>
                  <span className="value">{booking.numberOfPassengers}</span>
                </div>
                <div className="detail">
                  <span className="label">Total Price:</span>
                  <span className="value price">${booking.totalPrice.toFixed(2)}</span>
                </div>
                <div className="detail">
                  <span className="label">Status:</span>
                  <span className={`value status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
              </div>

              <button className="btn btn-danger" onClick={() => handleCancel(booking.id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CancelFlight
