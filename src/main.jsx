import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


import App from './Pages/Main/App.jsx'
import Statictics from './Pages/Statictics/Statictics.jsx'
import Footer from './Pages/Footer/Footer.jsx'
import Semples from './Pages/Semples/Semples.jsx'
import Settings from './Pages/Settings/Settings.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
      refetchOnMount: false, // Отключаем повторный запрос при монтировании компонента
      refetchOnReconnect: false, // Отключаем повторный запрос при восстановлении соединения
    },
  },
})

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Footer />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/stat" element={<Statictics />} />
          <Route path="/semples" element={<Semples />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </QueryClientProvider>



  </StrictMode>,
)
