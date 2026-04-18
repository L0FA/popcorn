import { useRef } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Row.css'

const Row = ({ title, movies, onMovieClick, loading }) => {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 300
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (loading) {
    return (
      <div className="row">
        <h2 className="row-title">{title}</h2>
        <div className="row-container">
          <div className="row-posters">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-poster"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!movies || movies.length === 0) return null

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      
      <div className="row-container">
        <button className="row-scroll-btn left" onClick={() => scroll('left')}>
          ‹
        </button>
        
        <div className="row-posters" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
        
        <button className="row-scroll-btn right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  )
}

export default Row
