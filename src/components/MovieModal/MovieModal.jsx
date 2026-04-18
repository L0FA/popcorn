import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl, getMovieDetails, getMovieVideos } from '../../services/tmdb'
import { useWatchList } from '../../context/WatchListContext'
import './MovieModal.css'

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [closing, setClosing] = useState(false)
  const { isInWatchList, toggleWatchList } = useWatchList()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movie) return
      
      try {
        setLoading(true)
        const [detailsData, videosData] = await Promise.all([
          getMovieDetails(movie.id),
          getMovieVideos(movie.id)
        ])
        
        setDetails(detailsData)
        
        const trailer = videosData.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailer) {
          setVideoKey(trailer.key)
        }
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [movie])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [closing])

  if (!movie) return null

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => onClose(), 250)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const inWatchList = isInWatchList(movie.id)

  return (
    <div className={`modal-overlay ${closing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>×</button>
        
        <div className="modal-hero">
          <img 
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')} 
            alt={movie.title} 
          />
          <div className="modal-hero-gradient" />
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="modal-loading">Cargando...</div>
          ) : (
            <>
              <h1 className="modal-title">{movie.title}</h1>
              
              <div className="modal-meta">
                <span className="modal-rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span>{movie.release_date?.split('-')[0]}</span>
                <span>{details?.runtime || 'N/A'} min</span>
                <span>{details?.status}</span>
              </div>

              <div className="modal-genres">
                {details?.genres?.map(genre => (
                  <span key={genre.id} className="modal-genre-tag">{genre.name}</span>
                ))}
              </div>

              <p className="modal-overview">
                {movie.overview || 'No hay descripción disponible.'}
              </p>

              <div className="modal-buttons">
                <button className="btn btn-play" onClick={() => navigate(`/movie/${movie.id}`)}>▶ Reproducir</button>
                <button className="btn btn-info" onClick={() => toggleWatchList(movie)}>
                  {inWatchList ? '✓ Mi Lista' : '+ Mi Lista'}
                </button>
              </div>

              {videoKey && (
                <div className="modal-trailer">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=0`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieModal
