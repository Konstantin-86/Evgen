import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


import App from './App.jsx'
import Statictics from './components/Statictics'
import Footer from './Pages/Footer.jsx'
import Semples from './Pages/Semples/Semples.jsx'
import Settings from './Pages/Settings.jsx'

import {FetchSemples} from "./components/API/FetchSemples.jsx"

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchSemples>
      <Router>
      <Footer/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stat" element={<Statictics />} />
        <Route path="/semples" element={<Semples />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </FetchSemples>
    
  </StrictMode>,
)
