import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmokeSparksCanvas from './components/SmokeSparksCanvas';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="neon-tube"></div>
      <SmokeSparksCanvas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}