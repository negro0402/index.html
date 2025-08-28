import { useEffect, useState } from 'react'

export default function GameBreathing() {
  const [phase, setPhase] = useState('Inhala')
  const [count, setCount] = useState(4)

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1
        setPhase((p) => {
          if (p === 'Inhala') {
            setCount(7)
            return 'Sostén'
          }
          if (p === 'Sostén') {
            setCount(8)
            return 'Exhala'
          }
          setCount(4)
          return 'Inhala'
        })
        return c
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Respiración 4-7-8</h3>
      <div style={{ fontSize: 24, marginTop: 16 }}>{phase}</div>
      <div style={{ fontSize: 48, marginTop: 8 }}>{count}</div>
      <div style={{ marginTop: 24, opacity: 0.7 }}>2–3 minutos recomendados</div>
    </div>
  )
}

