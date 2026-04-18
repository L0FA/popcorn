import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../services/tmdb'
import './Hero.css'

const Hero = ({ movie, loading }) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!loading && movie) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [loading, movie])

  if (loading || !movie) {
    return (
      <div className="hero hero-skeleton">
        <div className="hero-background">
          <div className="skeleton-bg"></div>
          <div className="hero-gradient" />
        </div>
        <div className="hero-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-desc"></div>
          <div className="skeleton-desc short"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleMoreInfo = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className={`hero ${visible ? 'visible' : ''}`}>
      <div className="hero-background">
        <img 
          src={getImageUrl(movie.backdrop_path, 'original')} 
          alt={movie.title} 
          className="hero-bg-image"
        />
        <div className="hero-gradient" />
        <div className="hero-glow"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-icon">🍿</span>
          <span>Trending esta semana</span>
        </div>
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-description">{movie.overview}</p>
        <div className="hero-meta">
          <span className="hero-rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd23f">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {movie.vote_average?.toFixed(1)}
          </span>
          <span className="hero-year">{movie.release_date?.split('-')[0]}</span>
        </div>
        <div className="hero-buttons">
          <button className="btn btn-play" onClick={handleMoreInfo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Ver ahora
          </button>
          <button className="btn btn-info" onClick={handleMoreInfo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Más info
          </button>
        </div>
      </div>

      <div className="hero-fade-bottom" />
    </div>
  )
}

export default Hero