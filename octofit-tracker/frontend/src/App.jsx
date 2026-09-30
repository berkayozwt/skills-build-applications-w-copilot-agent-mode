import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { apiBaseUrl, apiEnvironment } from './api'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const navItems = [
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Training operations dashboard</h1>
          <p className="api-status">
            {apiEnvironment} · <code>{apiBaseUrl}</code>
          </p>
        </div>
        <nav className="nav nav-pills">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
