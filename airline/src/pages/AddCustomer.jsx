import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Features.css'

function AddCustomer({ user }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    city: '',
    country: '',
    passportNumber: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/auth/profile/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        city: response.data.city || '',
        country: response.data.country || '',
        passportNumber: response.data.passportNumber || ''
      })
    } catch (err) {
      console.error('Failed to load profile')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8080/api/auth/profile/${user.userId}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feature-page container">
      <h1>Add/Update Customer Information 👤</h1>
      <p className="page-subtitle">Update your personal information</p>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              placeholder="Your passport number"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="form-content">
        <h2>Current Information</h2>
        <div className="info-display">
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{formData.phone || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <span className="label">Address:</span>
            <span className="value">{formData.address || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <span className="label">City:</span>
            <span className="value">{formData.city || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <span className="label">Country:</span>
            <span className="value">{formData.country || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <span className="label">Passport Number:</span>
            <span className="value">{formData.passportNumber || 'Not provided'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer
