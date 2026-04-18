const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const fetchAPI = async (endpoint, params) => {
  params = params || {}
  const keys = Object.keys(params)
  const queryParams = 'api_key=' + API_KEY + '&language=es-ES'
  var queryString = queryParams
  keys.forEach(function(key) {
    queryString = queryString + '&' + key + '=' + params[key]
  })
  
  var url = BASE_URL + endpoint + '?' + queryString
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const getTrending = () => fetchAPI('/trending/movie/week')
export const getPopular = () => fetchAPI('/movie/popular')
export const getTopRated = () => fetchAPI('/movie/top_rated')
export const getActionMovies = () => fetchAPI('/discover/movie', { 'with_genres': 28 })
export const getComedyMovies = () => fetchAPI('/discover/movie', { 'with_genres': 35 })
export const getHorrorMovies = () => fetchAPI('/discover/movie', { 'with_genres': 27 })
export const getRomanceMovies = () => fetchAPI('/discover/movie', { 'with_genres': 10749 })
export const getDocumentaries = () => fetchAPI('/discover/movie', { 'with_genres': 99 })

export const getMovieDetails = (id) => fetchAPI('/movie/' + id)
export const getMovieVideos = (id) => fetchAPI('/movie/' + id + '/videos')
export const searchMovies = (query) => fetchAPI('/search/movie', { query: query })

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
export const getImageUrl = (path, size) => {
  if (!path) return '/placeholder.jpg'
  size = size || 'original'
  return IMAGE_BASE_URL + size + path
}
