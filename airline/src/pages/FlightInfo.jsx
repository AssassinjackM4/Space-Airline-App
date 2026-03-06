import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function FlightInfo() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchFlight, setSearchFlight] = useState('')

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get('http://localhost:8080/api/flights/public/all')
      console.log('Flights fetched:', response.data)
      setFlights(response.data)
    } catch (err) {
      console.error('Failed to load flights:', err)
      setError('Failed to load flights. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredFlights = flights.filter(f => {
    try {
      const flightNum = f.flightNumber ? f.flightNumber.toLowerCase() : ''
      const departure = f.departureAirport ? f.departureAirport.toLowerCase() : ''
      const arrival = f.arrivalAirport ? f.arrivalAirport.toLowerCase() : ''
      const search = searchFlight.toLowerCase()
      
      return flightNum.includes(search) || departure.includes(search) || arrival.includes(search)
    } catch (e) {
      console.error('Error filtering flight:', f, e)
      return false
    }
  })

  return (
    <div className="feature-page container">
      <h1>Flight Information 📊</h1>
      <p className="page-subtitle">Check detailed flight information and status</p>

      <div className="filter-card">
        <h2>Search Flights</h2>
        <div className="filter-form">
          <div className="filter-group">
            <label>Flight Number or Airport</label>
            <input
              type="text"
              placeholder="e.g., SK123, JFK, LAX"
              value={searchFlight}
              onChange={(e) => setSearchFlight(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading">Loading flight information...</p>}

      {!loading && flights.length === 0 && !error && (
        <p className="no-results">No flights available at the moment.</p>
      )}

      {!loading && filteredFlights.length === 0 && flights.length > 0 && (
        <p className="no-results">No flights found matching your search.</p>
      )}

      {!loading && filteredFlights.length > 0 && (
        <div className="flights-list">
          <h2>Flight Details ({filteredFlights.length})</h2>
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-route">
                <div className="airport">
                  <span className="code">{flight.departureAirport}</span>
                  <span className="time">{flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flight-info">
                  <div className="duration">
                    <div className="line"></div>
                    <span>{flight.flightNumber}</span>
                  </div>
                </div>
                <div className="airport">
                  <span className="code">{flight.arrivalAirport}</span>
                  <span className="time">{flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'N/A'}</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail">
                  <span className="label">Airline:</span>
                  <span className="value">{flight.airline || 'N/A'}</span>
                </div>
                <div className="detail">
                  <span className="label">Aircraft:</span>
                  <span className="value">{flight.aircraftType || 'N/A'}</span>
                </div>
                <div className="detail">
                  <span className="label">Total Seats:</span>
                  <span className="value">{flight.totalSeats || 'N/A'}</span>
                </div>
                <div className="detail">
                  <span className="label">Available:</span>
                  <span className="value">{flight.availableSeats !== undefined ? flight.availableSeats : 'N/A'}</span>
                </div>
                <div className="detail">
                  <span className="label">Price:</span>
                  <span className="value price">${flight.price ? flight.price.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="detail">
                  <span className="label">Status:</span>
                  <span className={`value status ${flight.status ? flight.status.toLowerCase() : 'unknown'}`}>{flight.status || 'Unknown'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FlightInfo
