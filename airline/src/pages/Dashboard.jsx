import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

function Dashboard({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/bookings/user/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setBookings(response.data)
    } catch (err) {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName}! ✈️</h1>
        <p>Manage your flights and bookings from here</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/book-flight" className="action-card">
          <div className="action-icon">🎫</div>
          <h3>Book Flight</h3>
          <p>Search and book your next flight</p>
        </Link>
        <Link to="/flight-info" className="action-card">
          <div className="action-icon">✈️</div>
          <h3>Flight Info</h3>
          <p>Check flight details and status</p>
        </Link>
        <Link to="/boarding-pass" className="action-card">
          <div className="action-icon">🎫</div>
          <h3>Boarding Pass</h3>
          <p>Download your boarding passes</p>
        </Link>
        <Link to="/journey-details" className="action-card">
          <div className="action-icon">📍</div>
          <h3>Journey Details</h3>
          <p>View your trip information</p>
        </Link>
        <Link to="/cancel-flight" className="action-card">
          <div className="action-icon">❌</div>
          <h3>Cancel Booking</h3>
          <p>Cancel your flight bookings</p>
        </Link>
        <Link to="/add-customer" className="action-card">
          <div className="action-icon">👤</div>
          <h3>My Profile</h3>
          <p>Update your personal information</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bookings-section">
        <h2>Your Recent Bookings</h2>
        
        {loading && <p className="loading">Loading bookings...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && bookings.length === 0 && (
          <div className="no-bookings">
            <p>No bookings yet. <Link to="/book-flight">Book your first flight now!</Link></p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.flightNumber}</h3>
                  <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">From:</span>
                    <span className="value">{booking.departureAirport}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">To:</span>
                    <span className="value">{booking.arrivalAirport}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Departure:</span>
                    <span className="value">{new Date(booking.departureTime).toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Passengers:</span>
                    <span className="value">{booking.numberOfPassengers}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Total Price:</span>
                    <span className="value">${booking.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Booking Reference:</span>
                    <span className="value">{booking.bookingReference}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Info Card */}
      <div className="user-info-card">
        <h2>Your Profile Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user?.firstName} {user?.lastName}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Account Type:</span>
            <span className="value">{user?.userType === 'ADMIN' ? 'Administrator' : 'Customer'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
