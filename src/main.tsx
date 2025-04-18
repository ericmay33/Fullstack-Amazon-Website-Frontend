import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './components/MainLayout.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop.tsx'
import Browse from './pages/Browse.tsx'
import Product from './pages/Product.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Browse/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
