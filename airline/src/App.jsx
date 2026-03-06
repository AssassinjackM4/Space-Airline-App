import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BookFlight from './pages/BookFlight'
import AddCustomer from './pages/AddCustomer'
import BoardingPass from './pages/BoardingPass'
import CancelFlight from './pages/CancelFlight'
import FlightInfo from './pages/FlightInfo'
import JourneyDetails from './pages/JourneyDetails'
import AdminPanel from './pages/AdminPanel'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <Router>
      <div className="app">
        <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard user={user} />} />} />
            <Route path="/book-flight" element={<ProtectedRoute element={<BookFlight user={user} />} />} />
            <Route path="/add-customer" element={<ProtectedRoute element={<AddCustomer user={user} />} />} />
            <Route path="/boarding-pass" element={<ProtectedRoute element={<BoardingPass user={user} />} />} />
            <Route path="/cancel-flight" element={<ProtectedRoute element={<CancelFlight user={user} />} />} />
            <Route path="/flight-info" element={<ProtectedRoute element={<FlightInfo />} />} />
            <Route path="/journey-details" element={<ProtectedRoute element={<JourneyDetails user={user} />} />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel user={user} />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
