import { getImageUrl } from '../../services/tmdb'
import { useWatchList } from '../../context/WatchListContext'
import './MovieCard.css'

const MovieCard = ({ movie, onClick }) => {
  const { isInWatchList, toggleWatchList } = useWatchList()
  
  if (!movie) return null

  const releaseYear = movie.release_date 
    ? movie.release_date.split('-')[0] 
    : 'N/A'

  const inList = isInWatchList(movie.id)

  const handleClick = (e) => {
    e.stopPropagation()
    onClick(movie)
  }

  const handleListClick = (e) => {
    e.stopPropagation()
    toggleWatchList(movie)
  }

  return (
    <div className="poster" onClick={handleClick}>
      <img 
        src={getImageUrl(movie.poster_path, 'w500')} 
        alt={movie.title || movie.name} 
      />
      <div className="poster-info">
        <h4>{movie.title || movie.name}</h4>
        <span>⭐ {movie.vote_average?.toFixed(1)} • {releaseYear}</span>
        <div className="poster-actions">
          <button 
            className={`poster-action-btn ${inList ? 'added' : ''}`}
            onClick={handleListClick}
            title={inList ? 'Quitar de Mi Lista' : 'Agregar a Mi Lista'}
          >
            {inList ? '✓' : '+'}
          </button>
          <button className="poster-action-btn" title="Ver detalles">
            ⓘ
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
