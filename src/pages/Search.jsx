import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import MovieCard from '../components/MovieCard/MovieCard'
import MovieModal from '../components/MovieModal/MovieModal'
import Footer from '../components/Footer/Footer'
import { useSearch } from '../hooks/useMovieFetch'
import './Search.css'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [selectedMovie, setSelectedMovie] = useState(null)
  
  const { data: results, loading } = useSearch(query)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="app">
      <Navbar />
      
      <div className="search-results">
        <h2>
          {loading 
            ? 'Buscando...' 
            : results.length > 0 
              ? `Resultados para "${query}" (${results.length})`
              : `No se encontraron resultados para "${query}"`
          }
        </h2>
        
        {!loading && results.length > 0 && (
          <div className="search-grid">
            {results.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={setSelectedMovie}
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

export default Search
