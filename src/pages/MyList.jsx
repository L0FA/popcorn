import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import MovieCard from '../components/MovieCard/MovieCard'
import MovieModal from '../components/MovieModal/MovieModal'
import Footer from '../components/Footer/Footer'
import { useWatchList } from '../context/WatchListContext'
import './MyList.css'

const MyList = () => {
  const { watchList } = useWatchList()
  const [selectedMovie, setSelectedMovie] = useState(null)

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  return (
    <div className="app">
      <Navbar />
      
      <div className="mylist-results">
        <h2>Mi Lista {watchList.length > 0 && `(${watchList.length})`}</h2>
        
        {watchList.length === 0 ? (
          <div className="mylist-empty">
            <p>Tu lista está vacía.</p>
            <p>Agrega películas y series para verlas aquí.</p>
            <Link to="/" className="mylist-browse">Explorar contenido</Link>
          </div>
        ) : (
          <div className="mylist-grid">
            {watchList.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default MyList
