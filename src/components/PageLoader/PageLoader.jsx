import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './PageLoader.css'

const PageLoader = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const timeoutRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    setProgress(0)

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30
      if (currentProgress >= 90) {
        currentProgress = 90
        clearInterval(interval)
      }
      setProgress(currentProgress)
    }, 100)

    const hideTimeout = setTimeout(() => {
      setProgress(100)
      clearInterval(interval)
      setTimeout(() => setLoading(false), 200)
    }, 800)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimeout)
    }
  }, [location.pathname])

  if (!loading && progress === 0) return null

  return (
    <div className={`page-loader ${loading ? 'active' : ''}`}>
      <div 
        className="page-loader-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default PageLoader