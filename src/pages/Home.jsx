import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Row from '../components/Row/Row'
import MovieModal from '../components/MovieModal/MovieModal'
import Footer from '../components/Footer/Footer'
import { useTrending, usePopular, useTopRated, useActionMovies, useComedyMovies, useHorrorMovies } from '../hooks/useMovieFetch'

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null)
  
  const { data: trending, loading: loadingTrending } = useTrending()
  const { data: popular, loading: loadingPopular } = usePopular()
  const { data: topRated, loading: loadingTopRated } = useTopRated()
  const { data: action, loading: loadingAction } = useActionMovies()
  const { data: comedy, loading: loadingComedy } = useComedyMovies()
  const { data: horror, loading: loadingHorror } = useHorrorMovies()

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  const heroMovie = trending[0]

  return (
    <div className="app">
      <Navbar />
      
      <Hero movie={heroMovie} loading={loadingTrending} />
      
      <div className="rows-container">
        <Row 
          title="Tendencias de la semana" 
          movies={trending} 
          onMovieClick={handleMovieClick}
          loading={loadingTrending}
        />
        <Row 
          title="Películas Populares" 
          movies={popular} 
          onMovieClick={handleMovieClick}
          loading={loadingPopular}
        />
        <Row 
          title="Mejor Valoradas" 
          movies={topRated} 
          onMovieClick={handleMovieClick}
          loading={loadingTopRated}
        />
        <Row 
          title="Acción" 
          movies={action} 
          onMovieClick={handleMovieClick}
          loading={loadingAction}
        />
        <Row 
          title="Comedia" 
          movies={comedy} 
          onMovieClick={handleMovieClick}
          loading={loadingComedy}
        />
        <Row 
          title="Terror" 
          movies={horror} 
          onMovieClick={handleMovieClick}
          loading={loadingHorror}
        />
      </div>
      
      <Footer />
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default Home
