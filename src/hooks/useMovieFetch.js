import { useState, useEffect } from 'react'
import * as api from '../services/tmdb'

export const useMovieFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchFunction()
        setData(result.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}

export const useTrending = () => useMovieFetch(() => api.getTrending(), [])
export const usePopular = () => useMovieFetch(() => api.getPopular(), [])
export const useTopRated = () => useMovieFetch(() => api.getTopRated(), [])
export const useActionMovies = () => useMovieFetch(() => api.getActionMovies(), [])
export const useComedyMovies = () => useMovieFetch(() => api.getComedyMovies(), [])
export const useHorrorMovies = () => useMovieFetch(() => api.getHorrorMovies(), [])
export const useRomanceMovies = () => useMovieFetch(() => api.getRomanceMovies(), [])
export const useDocumentaries = () => useMovieFetch(() => api.getDocumentaries(), [])

export const useSearch = (query) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setData([])
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await api.searchMovies(query)
        setData(result.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchData, 500)
    return () => clearTimeout(debounce)
  }, [query])

  return { data, loading, error }
}
