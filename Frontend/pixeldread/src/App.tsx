import { Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import './App.css'

function App() {

  return (
    <>
       <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
    </>
  )
}

export default App
