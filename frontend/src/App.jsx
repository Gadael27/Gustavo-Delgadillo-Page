import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cotizacion from './pages/Cotizacion';
import Admin from './pages/Admin';
import CompraCabina from './pages/CompraCabina';
import Blog from './pages/Blog'; // ✅ NUEVA IMPORTACIÓN DEL MÓDULO DE CONTENIDOS

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizacion" element={<Cotizacion />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/compra-tu-cabina" element={<CompraCabina />} />
        <Route path="/blog" element={<Blog />} /> {/* ✅ RUTA PÚBLICA TOTALMENTE ACTIVADA */}
      </Routes>
    </>
  );
}