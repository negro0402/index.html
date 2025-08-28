import { Outlet, Link } from 'react-router-dom'

export default function Root() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>EmoPlay</h2>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Inicio</Link>
          <Link to="/games/breathing">Respiración</Link>
          <Link to="/games/match3">Match-3</Link>
        </nav>
      </header>
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
      <footer style={{ marginTop: 40, fontSize: 12, opacity: 0.7 }}>
        Bienestar orientativo, no reemplaza ayuda profesional.
      </footer>
    </div>
  )
}

