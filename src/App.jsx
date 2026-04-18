import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import MyList from './pages/MyList'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import PageLoader from './components/PageLoader/PageLoader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('popcorn-loaded')
    if (hasLoaded) {
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem('popcorn-loaded', 'true')
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <BrowserRouter>
        <PageLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my-list" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App