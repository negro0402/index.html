import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/Root.jsx'
import Chat from './routes/Chat.jsx'
import GameBreathing from './routes/games/Breathing.jsx'
import GameMatch3 from './routes/games/Match3.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Chat /> },
      { path: 'games/breathing', element: <GameBreathing /> },
      { path: 'games/match3', element: <GameMatch3 /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
