import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getMovieDetails, getMovieVideos, getImageUrl } from '../services/tmdb'
import { useWatchList } from '../context/WatchListContext'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './MovieDetail.css'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isInWatchList, toggleWatchList } = useWatchList()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const [movieData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id)
        ])
        
        setMovie(movieData)
        
        const trailer = videosData.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailer) {
          setVideoKey(trailer.key)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="detail-loading">
          <div className="detail-spinner"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="app">
        <Navbar />
        <div className="detail-error">
          <h2>Película no encontrada</h2>
          <Link to="/">Volver al inicio</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const inWatchList = isInWatchList(movie.id)

  return (
    <div className="app">
      <Navbar />
      <div className="movie-detail">
        <div className="detail-backdrop">
          <img 
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')} 
            alt={movie.title} 
          />
          <div className="detail-backdrop-gradient" />
        </div>

        <div className="detail-content">
          <button className="detail-back" onClick={() => navigate(-1)}>
            ← Volver
          </button>

          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="detail-meta">
            <span className="detail-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>{movie.runtime} min</span>
            <span className="detail-tag">{movie.status}</span>
          </div>

          <div className="detail-genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="detail-genre">{genre.name}</span>
            ))}
          </div>

          <div className="detail-buttons">
            {videoKey && (
              <a 
                href={`https://www.youtube.com/watch?v=${videoKey}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-play"
              >
                ▶ Reproducir Trailer
              </a>
            )}
            <button className="btn btn-info" onClick={() => toggleWatchList(movie)}>
              {inWatchList ? '✓ En Mi Lista' : '+ Agregar a Mi Lista'}
            </button>
          </div>

          <p className="detail-overview">{movie.overview}</p>

          {movie.tagline && (
            <p className="detail-tagline">"{movie.tagline}"</p>
          )}

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <h4>Presupuesto</h4>
              <p>${movie.budget?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="detail-info-item">
              <h4>Ingresos</h4>
              <p>${movie.revenue?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="detail-info-item">
              <h4>Idioma original</h4>
              <p>{movie.original_language?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MovieDetail
