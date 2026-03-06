import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
    setMenuOpen(false)
  }

  const navigateTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <span className="logo-icon">✈️</span>
            <span className="logo-text">Space Airlines</span>
          </Link>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/book-flight" className="nav-link" onClick={() => setMenuOpen(false)}>Book Flight</Link>
                  <Link to="/flight-info" className="nav-link" onClick={() => setMenuOpen(false)}>Flight Info</Link>
                  <Link to="/boarding-pass" className="nav-link" onClick={() => setMenuOpen(false)}>Boarding Pass</Link>
                  {user?.userType === 'ADMIN' && (
                    <Link to="/admin" className="nav-link admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                  )}
                  <div className="user-menu">
                    <div className="user-info">
                      <span className="username">{user?.firstName} {user?.lastName}</span>
                      <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="nav-link btn btn-primary signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
