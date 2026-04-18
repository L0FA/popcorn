import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🍿 Popcorn</span>
          <p className="footer-tagline">Tu película perfecta te está esperando</p>
        </div>

        <div className="footer-links">
          <div className="footer-links-col">
            <Link to="/">Inicio</Link>
            <Link to="/category/popular">Películas</Link>
            <Link to="/category/top-rated">Destacadas</Link>
            <Link to="/my-list">Mi Lista</Link>
          </div>
          <div className="footer-links-col">
            <a href="#">Sobre nosotros</a>
            <a href="#">Contacto</a>
            <a href="#">API de TMDB</a>
            <a href="#">Política de privacidad</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            Hecho con 🍿 y mucho café • {new Date().getFullYear()}
          </p>
          <p className="footer-credit">
            Datos proporcionados por TMDB
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer