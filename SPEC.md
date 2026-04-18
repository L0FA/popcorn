# Netflix Clone - SPEC.md

## 1. Project Overview

- **Project Name:** Netflix Clone
- **Type:** Web Application (Single Page Application)
- **Core Functionality:** Películas y series con navegación estilo Netflix, consumo de API de TMDB, visualización de detalles y trailer
- **Target Users:** Usuarios que buscan entretenimiento, recruiters evaluando habilidades frontend

## 2. Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router DOM v6
- **Styling:** CSS Modules o styled-components
- **API:** The Movie Database (TMDB) API
- **Deployment:** Vercel

## 3. UI/UX Specification

### Color Palette
- **Background:** #141414 (negro Netflix)
- **Primary:** #E50914 (rojo Netflix)
- **Text Primary:** #FFFFFF
- **Text Secondary:** #B3B3B3
- **Hover:** #E50914 con opacity

### Typography
- **Font Family:** Netflix Sans, fallback Arial
- **Headings:** 700 weight, escala: 4rem (hero), 1.5rem (titles)
- **Body:** 400 weight, 0.9rem

### Layout Structure
- **Navbar:** Fixed top, logo + links + search
- **Hero:** Full viewport height, background image + gradient overlay + title + buttons
- **Rows:** Horizontal scroll de películas (cards horizontales)
- **Footer:** Links útiles, copyright

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Components
1. **Navbar**: Logo, Links (Inicio, Series, Películas, Mi Lista), Search input, Avatar
2. **Hero**: Banner con imagen grande, título, descripción, botones (Play, More Info)
3. **Row**: Título de categoría, scroll horizontal de posters
4. **MovieCard**: Poster de película/serie, hover muestra información adicional
5. **MovieModal**: Modal con detalles (sinopsis, cast, rating, año)
6. **SearchBar**: Input con autocompletado
7. **Footer**: Links de navegación

### Animaciones
- Hover en cards: scale(1.1), z-index elevate
- Transiciones suaves en rows (scroll)
- Fade in en hero

## 4. Functionality Specification

### Core Features
1. **Home Page**: 
   - Hero con película trending
   - Rows con diferentes categorías (Trending, Popular, Top Rated, Action, Comedy, Horror)
   
2. **Navegación**:
   - Links a diferentes categorías
   - Scroll suave
   
3. **Búsqueda**:
   - Search input en navbar
   - Resultados en dropdown o página de resultados
   
4. **Detalle de película**:
   - Click en card abre modal o navega a página de detalle
   - Muestra: título, año, rating, sinopsis, duración, genres, trailer

5. **Mi Lista**:
   - Agregar/quitar de lista (localStorage)
   - Persistencia de datos

### API Endpoints (TMDB)
- `/trending/movie/week` - Trending
- `/movie/popular` - Popular
- `/movie/top_rated` - Top Rated
- `/discover/movie?with_genres=28` - Action
- `/discover/movie?with_genres=35` - Comedy
- `/discover/movie?with_genres=27` - Horror
- `/movie/{id}` - Detalle
- `/movie/{id}/videos` - Trailer

### User Interactions
- Hover en cards → mostrar información extra
- Click en card → abrir detalle
- Click en "Mi Lista" → agregar/quitar
- Search → filtrar resultados
- Scroll horizontal en rows

## 5. Acceptance Criteria

- [ ] Navbar fija con logo y navegación funcional
- [ ] Hero muestra película trending con gradient overlay
- [ ] Al menos 5 rows con diferentes categorías
- [ ] Scroll horizontal funciona suavemente
- [ ] Hover en cards muestra efecto visual
- [ ] Click en película muestra modal/página de detalle
- [ ] Trailer se puede reproducir (embed YouTube o video)
- [ ] Búsqueda filtra películas correctamente
- [ ] "Mi Lista" guarda y elimina películas (localStorage)
- [ ] Diseño responsive en mobile/tablet/desktop
- [ ] Sin errores en consola
- [ ] Loading states mientras carga API

## 6. Folder Structure

```
netflix-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Row/
│   │   ├── MovieCard/
│   │   ├── MovieModal/
│   │   ├── SearchBar/
│   │   └── Footer/
│   ├── hooks/
│   │   └── useMovieFetch.js
│   ├── context/
│   │   └── AuthContext.js (opcional)
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── MovieDetail.jsx
│   ├── services/
│   │   └── tmdb.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 7. API Key

El usuario debe obtener una API key gratuita de TMDB:
- Registrar en: https://www.themoviedb.org/
- Documentación: https://developer.themoviedb.org/docs
