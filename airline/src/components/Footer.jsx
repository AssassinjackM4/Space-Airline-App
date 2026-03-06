import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Space Airlines</h3>
            <p>Your trusted partner for safe and comfortable air travel.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/flight-info">Flight Info</a></li>
              <li><a href="/book-flight">Book Flight</a></li>
              <li><a href="/boarding-pass">Boarding Pass</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@spaceairlines.com</p>
            <p>Phone: 1-800-SKYFLY</p>
            <p>Address: 123 Air Street, Sky City, SA 12345</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Space Airlines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
