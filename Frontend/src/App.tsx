import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './admin/AdminPage'

import { Routes, Route } from 'react-router-dom'

function App() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminPage />}>
              <Route path="testpage" element={<div>Lol</div>} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
