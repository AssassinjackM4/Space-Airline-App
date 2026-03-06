import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function BookFlight({ user }) {
  const [flights, setFlights] = useState([])
  const [filters, setFilters] = useState({ from: '', to: '', date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [passengers, setPassengers] = useState(1)

  useEffect(() => {
    fetchAllFlights()
  }, [])

  const fetchAllFlights = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8080/api/flights/public/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setFlights(response.data)
    } catch (err) {
      setError('Failed to load flights')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleBooking = async () => {
    if (!selectedFlight) {
      alert('Please select a flight')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:8080/api/bookings/book',
        {
          flightId: selectedFlight.id,
          numberOfPassengers: passengers,
          passengerName: `${user.firstName} ${user.lastName}`
        },
        { headers: { 'X-User-Id': user.userId, 'Authorization': `Bearer ${token}` } }
      )
      alert(`Booking confirmed! Reference: ${response.data.bookingReference}`)
      setSelectedFlight(null)
      fetchAllFlights()
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.message || 'Please try again'))
    }
  }

  const filteredFlights = flights.filter(flight => {
    if (filters.from && !flight.departureAirport.toLowerCase().includes(filters.from.toLowerCase())) return false
    if (filters.to && !flight.arrivalAirport.toLowerCase().includes(filters.to.toLowerCase())) return false
    return true
  })

  return (
    <div className="feature-page container">
      <h1>Book Your Flight ✈️</h1>
      <p className="page-subtitle">Search and book your next flight easily</p>

      <div className="filter-card">
        <h2>Search Flights</h2>
        <div className="filter-form">
          <div className="filter-row">
            <div className="filter-group">
              <label>From (Departure Airport)</label>
              <input
                type="text"
                name="from"
                placeholder="e.g. JFK, LAX"
                value={filters.from}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>To (Arrival Airport)</label>
              <input
                type="text"
                name="to"
                placeholder="e.g. LHR, CDG"
                value={filters.to}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>Passengers</label>
              <input
                type="number"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="10"
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading">Loading flights...</p>}

      {!loading && filteredFlights.length === 0 && (
        <p className="no-results">No flights found. Try adjusting your search filters.</p>
      )}

      {!loading && filteredFlights.length > 0 && (
        <div className="flights-list">
          <h2>Available Flights ({filteredFlights.length})</h2>
          {filteredFlights.map((flight) => (
            <div key={flight.id} className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}>
              <div className="flight-route">
                <div className="airport">
                  <span className="code">{flight.departureAirport}</span>
                  <span className="time">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flight-info">
                  <div className="duration">
                    <div className="line"></div>
                    <span>{flight.flightNumber}</span>
                  </div>
                </div>
                <div className="airport">
                  <span className="code">{flight.arrivalAirport}</span>
                  <span className="time">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail">
                  <span className="label">Aircraft:</span>
                  <span className="value">{flight.aircraftType}</span>
                </div>
                <div className="detail">
                  <span className="label">Available Seats:</span>
                  <span className="value">{flight.availableSeats}</span>
                </div>
                <div className="detail">
                  <span className="label">Price:</span>
                  <span className="value price">${flight.price.toFixed(2)}</span>
                </div>
                <div className="detail">
                  <span className="label">Status:</span>
                  <span className={`value status ${flight.status.toLowerCase()}`}>{flight.status}</span>
                </div>
              </div>

              <button
                className={`btn ${selectedFlight?.id === flight.id ? 'btn-primary' : 'btn-primary'}`}
                onClick={() => setSelectedFlight(flight)}
              >
                {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedFlight && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Flight:</span>
              <span>{selectedFlight.flightNumber}</span>
            </div>
            <div className="summary-row">
              <span>Route:</span>
              <span>{selectedFlight.departureAirport} → {selectedFlight.arrivalAirport}</span>
            </div>
            <div className="summary-row">
              <span>Passengers:</span>
              <span>{passengers}</span>
            </div>
            <div className="summary-row">
              <span>Price per passenger:</span>
              <span>${selectedFlight.price.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(selectedFlight.price * passengers).toFixed(2)}</span>
            </div>
          </div>
          <button className="btn btn-secondary btn-block" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  )
}

export default BookFlight
