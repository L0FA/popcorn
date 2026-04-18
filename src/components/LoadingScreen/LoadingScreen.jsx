import { useState, useEffect } from 'react'
import './LoadingScreen.css'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => onComplete(), 600)
      }, 300)
    }
  }, [progress, onComplete])

  if (!visible) return null

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 35h24l3-15H5l3 15z" fill="#f73e3e" stroke="#ff6b35" strokeWidth="2"/>
            <path d="M10 18c0-3 2-5 5-5s5 2 5 5" stroke="#ffd23f" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="12" cy="10" r="4" fill="#ffd23f" className="popcorn popcorn-1"/>
            <circle cx="20" cy="8" r="5" fill="#ff9f1c" className="popcorn popcorn-2"/>
            <circle cx="28" cy="10" r="4" fill="#ffd23f" className="popcorn popcorn-3"/>
            <circle cx="16" cy="5" r="3" fill="#ff6b35" className="popcorn popcorn-4"/>
            <circle cx="24" cy="5" r="3" fill="#ff6b35" className="popcorn popcorn-5"/>
          </svg>
        </div>
        <h1 className="loading-title">Popcorn</h1>
        <div className="loading-bar">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="loading-text">
          {progress < 100 ? 'Preparando las palomitas...' : '¡Listo!'}
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen