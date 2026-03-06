import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function JourneyDetails({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)

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
      setError('Failed to load journey details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feature-page container">
      <h1>Journey Details 📍</h1>
      <p className="page-subtitle">View detailed information about your flights</p>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading">Loading journey details...</p>}

      {!loading && bookings.length === 0 && (
        <p className="no-results">No journeys yet. Book a flight to get started!</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="flights-list">
          <h2>Your Journeys ({bookings.length})</h2>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`flight-card ${selectedBooking?.id === booking.id ? 'selected' : ''}`}
              onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
            >
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
                  <span className="time">{new Date(booking.arrivalTime).toLocaleString()}</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail">
                  <span className="label">Booking Date:</span>
                  <span className="value">{new Date(booking.bookingDate).toLocaleString()}</span>
                </div>
                <div className="detail">
                  <span className="label">Reference:</span>
                  <span className="value">{booking.bookingReference}</span>
                </div>
                <div className="detail">
                  <span className="label">Status:</span>
                  <span className={`value status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="journey-details-card">
          <h2>Journey Details - {selectedBooking.bookingReference}</h2>
          <div className="details-grid">
            <div className="detail-section">
              <h3>Flight Information</h3>
              <div className="detail-item">
                <span className="label">Flight Number:</span>
                <span className="value">{selectedBooking.flightNumber}</span>
              </div>
              <div className="detail-item">
                <span className="label">Booking Reference:</span>
                <span className="value">{selectedBooking.bookingReference}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className={`value status ${selectedBooking.status.toLowerCase()}`}>{selectedBooking.status}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Route & Schedule</h3>
              <div className="detail-item">
                <span className="label">Departure:</span>
                <span className="value">{selectedBooking.departureAirport}</span>
              </div>
              <div className="detail-item">
                <span className="label">Departure Time:</span>
                <span className="value">{new Date(selectedBooking.departureTime).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Arrival:</span>
                <span className="value">{selectedBooking.arrivalAirport}</span>
              </div>
              <div className="detail-item">
                <span className="label">Arrival Time:</span>
                <span className="value">{new Date(selectedBooking.arrivalTime).toLocaleString()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Booking Details</h3>
              <div className="detail-item">
                <span className="label">Passengers:</span>
                <span className="value">{selectedBooking.numberOfPassengers}</span>
              </div>
              <div className="detail-item">
                <span className="label">Total Price:</span>
                <span className="value price">${selectedBooking.totalPrice.toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Booking Date:</span>
                <span className="value">{new Date(selectedBooking.bookingDate).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">
                  {Math.round((new Date(selectedBooking.arrivalTime) - new Date(selectedBooking.departureTime)) / 3600000)} hours
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JourneyDetails
