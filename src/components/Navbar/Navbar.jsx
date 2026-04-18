import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useWatchList } from '../../context/WatchListContext'
import './Navbar.css'

const PopcornLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 35h24l3-15H5l3 15z" fill="#f73e3e" stroke="#ff6b35" strokeWidth="2"/>
    <path d="M10 18c0-3 2-5 5-5s5 2 5 5" stroke="#ffd23f" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="12" cy="10" r="4" fill="#ffd23f"/>
    <circle cx="20" cy="8" r="5" fill="#ff9f1c"/>
    <circle cx="28" cy="10" r="4" fill="#ffd23f"/>
    <circle cx="16" cy="5" r="3" fill="#ff6b35"/>
    <circle cx="24" cy="5" r="3" fill="#ff6b35"/>
  </svg>
)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { watchList } = useWatchList()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setSearchQuery('')
    setSearchFocused(false)
    setMenuOpen(false)
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <PopcornLogo />
        <span className="logo-text">Popcorn</span>
      </Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          🏠 Inicio
        </Link>
        <Link to="/category/popular">🎬 Películas</Link>
        <Link to="/category/top-rated">⭐ Destacadas</Link>
        <Link to="/my-list" className="mylist-link">
          🍿 Mi Lista
          {watchList.length > 0 && (
            <span className="mylist-badge">{watchList.length}</span>
          )}
        </Link>
      </div>

      <form className={`navbar-search ${searchFocused ? 'focused' : ''}`} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <button type="submit" className="search-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </form>
    </nav>
  )
}

export default Navbar