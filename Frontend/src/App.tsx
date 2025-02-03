import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import BlogPage from './pages/BlogPage'

import AdminPage from './admin/AdminPage'
import AdminLayout from './admin/AdminLayout'

import { Routes, Route } from 'react-router-dom'

function App() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/blog' element={<BlogPage />} />          
          <Route path='/blog/:id' element={<h1>Blog Post</h1>} />

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path='blog' element={<BlogPage />} />
              <Route path='blog/:id' element={<h1>Blog Post</h1>} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
