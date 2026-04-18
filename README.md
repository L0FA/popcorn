# 🍿 Popcorn

Tu SaaS de películas con personalidad. Explora, descubre y guarda tus favoritas.

## Demo

Desplegado en Hostinger: https://popcorn.portfolioslf.com

## Características

- **Hero Banner Animado** - Imagen con zoom suave, gradientes vibrantes y elementos de UI modernos
- **6 Categorías Dinámicas** - Tendencias, Populares, Mejor Valoradas, Acción, Comedia, Terror
- **Sistema de Búsqueda** - Con debounce para mejor rendimiento
- **Mi Lista Persistente** - Guardada en localStorage
- **Modal Interactivo** - Detalles completos + trailer de YouTube
- **Loading States** - Skeleton loaders con shimmer animation
- **Animaciones** - Transiciones fluidas en cards, modales y navegación
- **100% Responsive** - Mobile, tablet y desktop

## Tech Stack

| Tecnología | Uso |
|------------|-----|
| React 18 | Framework UI |
| Vite | Build tool |
| React Router DOM v6 | Client-side routing |
| Context API | State management |
| TMDB API | Fuente de datos |
| CSS Custom | Estilos con variables |

## Competencias Demonstradas

- **React Patterns**: Hooks, Context, Component Composition
- **API Integration**: Fetch async/await, manejo de errores
- **UX/UI**: Loading states, skeleton loaders, micro-interactions
- **Animaciones CSS**: Keyframes, transitions, transforms
- **Responsive Design**: Mobile-first, breakpoints
- **State Management**: Context API para watchlist global

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/popcorn.git
cd popcorn

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## Configuración

### Obtener API Key de TMDB

1. Regístrate en [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Ve a Settings > API
3. Solicita una API key gratuita
4. Crea archivo `.env`:

```
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar/         # Navegación fija con logo animado
│   ├── Hero/           # Banner con glow effect
│   ├── Row/            # Filas scrollables
│   ├── MovieCard/       # Cards con hover effects
│   ├── MovieModal/     # Modal con transiciones
│   └── Footer/         # Footer con personalidad
├── context/
│   └── WatchListContext.jsx
├── hooks/
│   └── useMovieFetch.js
├── pages/
│   ├── Home.jsx
│   ├── MovieDetail.jsx
│   ├── Search.jsx
│   └── MyList.jsx
├── services/
│   └── tmdb.js
└── App.jsx
```

## Deploy

### Vercel

1. Conecta tu repo de GitHub
2. Agrega la variable `VITE_TMDB_API_KEY`
3. Deploy automático en cada push

### Build Local

```bash
npm run build    # Genera /dist
npm run preview  # Previsualiza
```

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Naranja | #ff6b35 | Primary accent |
| Rojo | #f73e3e | Secondary accent |
| Dorado | #ffd23f | Ratings, highlights |
| Azul Oscuro | #0f0f1a | Background |
| Púrpura Oscuro | #1a1a2e | Cards, surfaces |

## Autor

Tu Nombre - [GitHub](https://github.com/tu-usuario)

MIT License
# popcorn
