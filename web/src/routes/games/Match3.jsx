import { useEffect, useState } from 'react'

const gridSize = 6
const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7']

function randomBoard() {
  return Array.from({ length: gridSize * gridSize }, () => Math.floor(Math.random() * colors.length))
}

function index(r, c) { return r * gridSize + c }

function findMatches(board) {
  const toClear = new Set()
  for (let r = 0; r < gridSize; r++) {
    let run = 1
    for (let c = 1; c <= gridSize; c++) {
      if (c < gridSize && board[index(r, c)] === board[index(r, c - 1)]) run++
      else {
        if (run >= 3) {
          for (let k = c - run; k < c; k++) toClear.add(index(r, k))
        }
        run = 1
      }
    }
  }
  for (let c = 0; c < gridSize; c++) {
    let run = 1
    for (let r = 1; r <= gridSize; r++) {
      if (r < gridSize && board[index(r, c)] === board[index(r - 1, c)]) run++
      else {
        if (run >= 3) {
          for (let k = r - run; k < r; k++) toClear.add(index(k, c))
        }
        run = 1
      }
    }
  }
  return toClear
}

function collapse(board) {
  for (let c = 0; c < gridSize; c++) {
    let col = []
    for (let r = gridSize - 1; r >= 0; r--) {
      const v = board[index(r, c)]
      if (v !== null) col.push(v)
    }
    for (let r = gridSize - 1; r >= 0; r--) {
      board[index(r, c)] = col[gridSize - 1 - r] ?? Math.floor(Math.random() * colors.length)
    }
  }
}

export default function GameMatch3() {
  const [board, setBoard] = useState(() => randomBoard())
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const loop = () => {
      const matches = findMatches(board)
      if (matches.size > 0) {
        const next = [...board]
        matches.forEach(i => next[i] = null)
        setScore(s => s + matches.size)
        collapse(next)
        setBoard(next)
      }
    }
    loop()
  }, [board])

  function swap(i, j) {
    const next = [...board]
    const tmp = next[i]; next[i] = next[j]; next[j] = tmp
    setBoard(next)
  }

  function handleClick(i) {
    if (selected === null) setSelected(i)
    else {
      const r1 = Math.floor(selected / gridSize), c1 = selected % gridSize
      const r2 = Math.floor(i / gridSize), c2 = i % gridSize
      const adjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1
      if (adjacent) swap(selected, i)
      setSelected(null)
    }
  }

  return (
    <div>
      <h3>Match-3 sencillo</h3>
      <div style={{ marginBottom: 8 }}>Puntuación: {score}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 48px)`, gap: 4 }}>
        {board.map((v, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{ width: 48, height: 48, background: v === null ? '#ccc' : colors[v], border: selected === i ? '3px solid #2d3436' : '1px solid #636e72', cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  )
}

