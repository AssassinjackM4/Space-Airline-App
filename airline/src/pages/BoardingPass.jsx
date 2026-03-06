import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function BoardingPass({ user }) {
  const [boardingPasses, setBoardingPasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBoardingPasses()
  }, [])

  const fetchBoardingPasses = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/boarding-passes/user/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setBoardingPasses(response.data)
    } catch (err) {
      setError('Failed to load boarding passes')
    } finally {
      setLoading(false)
    }
  }

  const downloadBoardingPass = (pass) => {
    const content = `
BOARDING PASS
===================
Passenger: ${pass.passengerName}
Flight: ${pass.flightNumber}
Route: ${pass.departureAirport} → ${pass.arrivalAirport}
Seat: ${pass.seatNumber}
Boarding Pass #: ${pass.boardingPassNumber}
Departure: ${new Date(pass.departureTime).toLocaleString()}
Boarding Time: ${new Date(pass.boardingTime).toLocaleString()}
Status: ${pass.status}
===================
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `boarding_pass_${pass.boardingPassNumber}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="feature-page container">
      <h1>Boarding Passes 🎫</h1>
      <p className="page-subtitle">Manage and download your boarding passes</p>

      {loading && <p className="loading">Loading boarding passes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && boardingPasses.length === 0 && (
        <p className="no-results">No boarding passes yet. Book a flight first!</p>
      )}

      {!loading && boardingPasses.length > 0 && (
        <div className="flights-list">
          <h2>Your Boarding Passes ({boardingPasses.length})</h2>
          {boardingPasses.map((pass) => (
            <div key={pass.id} className="flight-card">
              <div className="flight-route">
                <div className="airport">
                  <span className="code">{pass.departureAirport}</span>
                  <span className="time">{new Date(pass.departureTime).toLocaleTimeString()}</span>
                </div>
                <div className="flight-info">
                  <div className="duration">
                    <div className="line"></div>
                    <span>{pass.flightNumber}</span>
                  </div>
                </div>
                <div className="airport">
                  <span className="code">{pass.arrivalAirport}</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail">
                  <span className="label">Passenger:</span>
                  <span className="value">{pass.passengerName}</span>
                </div>
                <div className="detail">
                  <span className="label">Seat:</span>
                  <span className="value">{pass.seatNumber}</span>
                </div>
                <div className="detail">
                  <span className="label">Boarding Pass #:</span>
                  <span className="value">{pass.boardingPassNumber}</span>
                </div>
                <div className="detail">
                  <span className="label">Status:</span>
                  <span className={`value status ${pass.status.toLowerCase()}`}>{pass.status}</span>
                </div>
              </div>

              <button className="btn btn-secondary" onClick={() => downloadBoardingPass(pass)}>
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BoardingPass
