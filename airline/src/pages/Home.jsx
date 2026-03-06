import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home({ isAuthenticated }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1661962354730-cda54fa4f9f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Take Flight to Your Dreams',
      description: 'Experience luxury travel with Space Airlines'
    },
    {
      id: 2,  
      image: 'https://i.pinimg.com/1200x/c1/92/cb/c192cb7eef75c1821648eb68bc93b7ab.jpg',
      title: 'Soar Above the Clouds',
      description: 'Comfortable seats and excellent service await you'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/1200x/40/ac/6e/40ac6ecbdde74daf6b94268e92b4eb3c.jpg',
      title: 'Journey with Confidence',
      description: 'Safe, reliable, and on-time flights to your favorite destinations'
    },
    {
      id: 4,
      image: 'https://www.gratistodo.com/wp-content/uploads/2017/02/Paris-Wallpapers-1.jpg',
      title: 'Explore the World',
      description: 'Discover new destinations and create unforgettable memories'
    },
    {
      id: 5,
      image: 'https://i.pinimg.com/1200x/a5/3c/54/a53c54218403d894323ecde28abcb5c5.jpg',
      title: '',
      description: ''
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="home">
      {/* Hero Carousel */}
      <section className="carousel-container">
        <div className="carousel">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay"></div>
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                {!isAuthenticated && (
                  <Link to="/signup" className="btn btn-secondary">Get Started</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="carousel-btn prev-btn" onClick={previousSlide}>❮</button>
        <button className="carousel-btn next-btn" onClick={nextSlide}>❯</button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Quick Search */}
      <section className="quick-search container">
        <div className="search-card">
          <h2>Find Your Flight</h2>
          <SearchForm />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations container">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <DestinationCard city="Taj Mahal" airport="INR" image="https://i.pinimg.com/736x/39/a5/69/39a569733cd9a9ed352512183137479b.jpg" />
          <DestinationCard city="London" airport="LHR" image="https://i.pinimg.com/1200x/47/87/e7/4787e74086a54538f12dea4ca7171f6d.jpg" />
          <DestinationCard city="Paris" airport="CDG" image="https://i.pinimg.com/1200x/bc/e0/03/bce003dd4ce8de6b82bbd68f45cc9549.jpg" />
          <DestinationCard city="Tokyo" airport="NRT" image="https://i.pinimg.com/1200x/4a/0d/36/4a0d3638b7b0091d65a9c37fbb67f78e.jpg" />
          <DestinationCard city="Dubai" airport="DXB" image="https://i.pinimg.com/1200x/d0/ee/19/d0ee1965394881e763892f1ba6f02fea.jpg" />
          <DestinationCard city="Sydney" airport="SYD" image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" />
          <DestinationCard city="Norway" airport="NRY" image="https://i.pinimg.com/736x/1c/59/82/1c59829e2abe7cbde2c453a180f2a914.jpg" />
          <DestinationCard city="New York" airport="JFK" image="https://i.pinimg.com/1200x/f8/62/8b/f8628bc960abb219196c459bf854f3dd.jpg" />
          <DestinationCard city=" " airport="" image="https://i.pinimg.com/736x/54/c9/16/54c9162ee5bf0f2f0982e7cc97d73e02.jpg" />
          <DestinationCard city=" " airport="GMP" image="https://i.pinimg.com/736x/a8/25/e7/a825e716a22f48b7468f2b25a57f48ea.jpg" />

        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2>Why Choose Space Airlines?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3>Modern Fleet</h3>
            <p>Travel in comfort with our state-of-the-art aircraft</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>Your safety is our top priority with excellent safety records</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Excellent Service</h3>
            <p>Professional crew dedicated to your comfort and satisfaction</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing with no hidden charges</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>On-Time Flights</h3>
            <p>99% on-time departure and arrival guarantee</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Network</h3>
            <p>Fly to over 200 destinations worldwide</p>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Fly?</h2>
          <p>Book your next flight with Space Airlines and enjoy premium service at competitive prices.</p>
          {isAuthenticated ? (
            <Link to="/book-flight" className="btn btn-secondary btn-large">Book a Flight</Link>
          ) : (
            <Link to="/signup" className="btn btn-secondary btn-large">Sign Up & Book</Link>
          )}
        </div>
      </section>
    </div>
  )
}

function SearchForm() {
  const [data, setData] = useState({
    from: '',
    to: '',
    date: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality will be implemented
    console.log('Search:', data)
  }

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="form-row">
        <div className="form-group">
          <label>From</label>
          <input type="text" name="from" placeholder="Departure City" value={data.from} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>To</label>
          <input type="text" name="to" placeholder="Arrival City" value={data.to} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={data.date} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
  )
}

function DestinationCard({ city, airport, image }) {
  return (
    <div className="destination-card">
      <div className="destination-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="destination-info">
        <h3>{city}</h3>
        <p>{airport}</p>
      </div>
    </div>
  )
}

export default Home
