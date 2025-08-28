import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './routers/Rutas'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Rutas/>
    </BrowserRouter>
    
  </StrictMode>,
)
