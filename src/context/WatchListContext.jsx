import { createContext, useContext, useState, useEffect } from 'react'

const WatchListContext = createContext()

export const useWatchList = () => {
  const context = useContext(WatchListContext)
  if (!context) {
    throw new Error('useWatchList must be used within WatchListProvider')
  }
  return context
}

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('netflix-watchlist')
    if (saved) {
      setWatchList(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('netflix-watchlist', JSON.stringify(watchList))
  }, [watchList])

  const addToWatchList = (movie) => {
    if (!watchList.find(m => m.id === movie.id)) {
      setWatchList([...watchList, movie])
    }
  }

  const removeFromWatchList = (movieId) => {
    setWatchList(watchList.filter(m => m.id !== movieId))
  }

  const isInWatchList = (movieId) => {
    return watchList.some(m => m.id === movieId)
  }

  const toggleWatchList = (movie) => {
    if (isInWatchList(movie.id)) {
      removeFromWatchList(movie.id)
    } else {
      addToWatchList(movie)
    }
  }

  return (
    <WatchListContext.Provider value={{
      watchList,
      addToWatchList,
      removeFromWatchList,
      isInWatchList,
      toggleWatchList
    }}>
      {children}
    </WatchListContext.Provider>
  )
}
