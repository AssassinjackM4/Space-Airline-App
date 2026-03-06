import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminPanel.css'

function AdminPanel({ user }) {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    flightNumber: '',
    airline: 'Space Airlines',
    aircraftType: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    totalSeats: 180,
    availableSeats: 180,
    price: 0
  })

  useEffect(() => {
    if (user?.userType !== 'ADMIN') {
      setError('You do not have permission to access the admin panel')
      return
    }
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'totalSeats' || name === 'availableSeats' || name === 'price'
        ? parseFloat(value) || 0
        : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/api/flights/admin/create', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setSuccess('Flight added successfully!')
      setFormData({
        flightNumber: '',
        airline: 'SkyWings Airlines',
        aircraftType: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        totalSeats: 180,
        availableSeats: 180,
        price: 0
      })
      setShowForm(false)
      setTimeout(() => {
        setSuccess('')
        fetchFlights()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add flight')
    }
  }

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8080/api/flights/admin/${flightId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setSuccess('Flight deleted successfully!')
      setTimeout(() => {
        setSuccess('')
        fetchFlights()
      }, 2000)
    } catch (err) {
      setError('Failed to delete flight')
    }
  }

  if (user?.userType !== 'ADMIN') {
    return (
      <div className="admin-panel container">
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="admin-panel container">
      <div className="admin-header">
        <h1>Admin Panel 🛡️</h1>
        <p>Manage flights and airline operations</p>
      </div>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Add Flight Button */}
      <div className="admin-controls">
        <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Flight'}
        </button>
      </div>

      {/* Add Flight Form */}
      {showForm && (
        <div className="flight-form-card">
          <h2>Add New Flight</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Flight Number *</label>
                <input
                  type="text"
                  name="flightNumber"
                  placeholder="e.g., SK101"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Airline *</label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Aircraft Type *</label>
                <input
                  type="text"
                  name="aircraftType"
                  placeholder="e.g., Boeing 737"
                  value={formData.aircraftType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Departure Airport *</label>
                <input
                  type="text"
                  name="departureAirport"
                  placeholder="e.g., JFK"
                  value={formData.departureAirport}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Arrival Airport *</label>
                <input
                  type="text"
                  name="arrivalAirport"
                  placeholder="e.g., LHR"
                  value={formData.arrivalAirport}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Seat *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Departure Time *</label>
                <input
                  type="datetime-local"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Arrival Time *</label>
                <input
                  type="datetime-local"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Total Seats *</label>
                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Available Seats *</label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Add Flight
            </button>
          </form>
        </div>
      )}

      {/* Flights List */}
      <div className="flights-management">
        <h2>Manage Flights</h2>
        
        {loading && <p className="loading">Loading flights...</p>}

        {!loading && flights.length === 0 && (
          <p className="no-results">No flights found.</p>
        )}

        {!loading && flights.length > 0 && (
          <div className="flights-table-container">
            <table className="flights-table">
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Route</th>
                  <th>Aircraft</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id}>
                    <td className="flight-number">{flight.flightNumber}</td>
                    <td>{flight.departureAirport} → {flight.arrivalAirport}</td>
                    <td>{flight.aircraftType}</td>
                    <td>{new Date(flight.departureTime).toLocaleString().split(',')[0]}</td>
                    <td>{new Date(flight.arrivalTime).toLocaleString().split(',')[0]}</td>
                    <td>{flight.availableSeats}/{flight.totalSeats}</td>
                    <td className="price">${flight.price.toFixed(2)}</td>
                    <td><span className={`status-badge ${flight.status.toLowerCase()}`}>{flight.status}</span></td>
                    <td className="actions">
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDeleteFlight(flight.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
