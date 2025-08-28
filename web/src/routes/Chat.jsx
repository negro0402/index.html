import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

const emotionToRoute = {
  estres: '/games/breathing',
  enojo: '/games/breathing',
  tristeza: '/games/match3',
  alegria: '/games/match3',
  neutro: '/games/breathing'
}

export default function Chat() {
  const [text, setText] = useState('')
  const [lastResult, setLastResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleAnalyze(e) {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await api.post('/analyze', { text })
      setLastResult(res.data)
    } catch (err) {
      console.error(err)
      setLastResult({ emotion: 'neutro', confidence: 0 })
    } finally {
      setLoading(false)
    }
  }

  function goToGame() {
    const route = emotionToRoute[lastResult?.emotion || 'neutro']
    navigate(route)
  }

  return (
    <div>
      <h3>Cuéntame cómo te sientes</h3>
      <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Escribe aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button disabled={loading}>
          {loading ? 'Analizando...' : 'Analizar'}
        </button>
      </form>
      {lastResult && (
        <div style={{ marginTop: 16 }}>
          <div>
            Emoción: <strong>{lastResult.emotion}</strong> · Confianza: {(lastResult.confidence * 100).toFixed(0)}%
          </div>
          <button onClick={goToGame} style={{ marginTop: 8 }}>Ir al minijuego recomendado</button>
        </div>
      )}
    </div>
  )
}

