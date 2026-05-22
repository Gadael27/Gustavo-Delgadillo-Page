import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(5,5,9,0.95)', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', borderBottom: '2px solid #ff007f', zIndex: 5000 }}>
      <Link to="/" className="font-dj" style={{ color: '#fff', fontSize: '2rem', textDecoration: 'none', textShadow: '0 0 10px #00f2fe' }}>⚡ GDL PRO</Link>
      <div style={{ display: 'flex', gap: '25px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', uppercase: 'true' }}>Inicio</Link>
        <Link to="/servicios" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Servicios & FAQs</Link>
        <Link to="/catalogo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
        <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>🔒 Panel</Link>
      </div>
    </nav>
  );
}