import React, { useState, useEffect } from 'react';
import { Calendar, Store, Disc, Settings, Menu, X, BookOpen, Home, Zap, Music } from 'lucide-react';
import miLogoOfficial from '../assets/Logo.jpeg';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990);
      if (window.innerWidth > 990) setIsMobileMenuOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 30);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navegar = (ruta) => {
    window.location.href = ruta;
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={15} />, route: '/', color: '#ff007f', glow: 'rgba(255,0,127,0.4)' },
    { id: 'cabina', label: 'Compra tu Mesa de DJ', icon: <Store size={15} />, route: '/compra-tu-cabina', color: '#ffeb3b', glow: 'rgba(255,235,59,0.4)' },
    { id: 'blog', label: 'Blog GD', icon: <BookOpen size={15} />, route: '/blog', color: '#00f2fe', glow: 'rgba(0,242,254,0.4)' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;600;800&display=swap');
        
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes equalizer {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        
        .nav-link-item {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: currentColor;
          transition: all 0.3s ease;
          transform: translateX(-50%);
          box-shadow: 0 0 10px currentColor;
        }
        
        .nav-link-item:hover::before {
          width: 100%;
        }
        
        .nav-link-item:hover {
          transform: translateY(-2px);
          text-shadow: 0 0 20px currentColor;
        }
        
        .logo-glow {
          animation: float 3s ease-in-out infinite;
        }
        
        .logo-glow:hover {
          animation: none;
          transform: scale(1.05);
        }
        
        .reservar-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .reservar-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.5s;
        }
        
        .reservar-btn:hover::after {
          left: 100%;
        }
        
        .hamburger-line {
          transition: all 0.3s ease;
        }
        
        .mobile-menu-enter {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .eq-bar-nav {
          width: 3px;
          background: linear-gradient(to top, #ff007f, #00f2fe);
          border-radius: 2px;
          animation: equalizer 0.8s ease-in-out infinite;
        }
        
        .eq-bar-nav:nth-child(2) { animation-delay: 0.1s; animation-duration: 0.6s; }
        .eq-bar-nav:nth-child(3) { animation-delay: 0.2s; animation-duration: 1s; }
        .eq-bar-nav:nth-child(4) { animation-delay: 0.15s; animation-duration: 0.7s; }
        
        @media (max-width: 990px) {
          .desktop-links { display: none !important; }
          .brand-text { display: none !important; }
        }
      `}</style>

      {/* NAVBAR PRINCIPAL */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', 
        backgroundColor: scrolled ? 'rgba(3, 3, 12, 0.95)' : 'rgba(3, 3, 12, 0.75)', 
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(0, 242, 254, 0.1)', 
        zIndex: 1000, 
        padding: isMobile ? '10px 15px' : '14px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: scrolled ? '0 8px 40px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.4s ease',
        boxSizing: 'border-box'
      }}>
        
        {/* LADO IZQUIERDO: REDES + LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
          
          {/* Redes Sociales con hover neón */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', 
            borderRight: '1px solid rgba(20, 20, 53, 0.8)', 
            paddingRight: '15px' 
          }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
               style={{ 
                 color: '#888', display: 'flex', alignItems: 'center', 
                 transition: 'all 0.3s ease', padding: '6px', borderRadius: '8px'
               }}
               onMouseEnter={(e) => { 
                 e.currentTarget.style.color = '#00f2fe'; 
                 e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
                 e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.3)';
               }} 
               onMouseLeave={(e) => { 
                 e.currentTarget.style.color = '#888'; 
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
               style={{ 
                 color: '#888', display: 'flex', alignItems: 'center', 
                 transition: 'all 0.3s ease', padding: '6px', borderRadius: '8px'
               }}
               onMouseEnter={(e) => { 
                 e.currentTarget.style.color = '#ff007f'; 
                 e.currentTarget.style.background = 'rgba(255, 0, 127, 0.1)';
                 e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 127, 0.3)';
               }} 
               onMouseLeave={(e) => { 
                 e.currentTarget.style.color = '#888'; 
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* Logo con efecto flotante y glow */}
          <div onClick={() => navegar('/')} className="logo-glow" 
               style={{ 
                 display: 'flex', alignItems: 'center', gap: '12px', 
                 cursor: 'pointer', transition: 'all 0.3s ease' 
               }}>
            <div style={{ 
              width: isMobile ? '36px' : '42px', 
              height: isMobile ? '36px' : '42px', 
              borderRadius: '50%', overflow: 'hidden',
              border: '2px solid #00f2fe', 
              backgroundColor: '#fff', 
              padding: '2px',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.4), 0 0 40px rgba(0, 242, 254, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <img src={miLogoOfficial} alt="Logo GD" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="brand-text" style={{ 
              color: '#fff', 
              fontSize: isMobile ? '1.2rem' : '1.6rem', 
              fontFamily: "'Bangers', cursive", 
              letterSpacing: '2px',
              textShadow: '0 0 20px rgba(255, 0, 127, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              GD <span style={{ color: '#ff007f' }}>PRODUCCIONES</span>
              {/* Mini equalizer animado */}
              <div style={{ display: 'flex', gap: '2px', height: '16px', alignItems: 'end', marginLeft: '4px' }}>
                <div className="eq-bar-nav" />
                <div className="eq-bar-nav" />
                <div className="eq-bar-nav" />
                <div className="eq-bar-nav" />
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: LINKS + ACCIONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '25px' }}>
          
          {/* Links de navegación desktop */}
          <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => navegar(link.route)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="nav-link-item"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: hoveredLink === link.id ? link.color : '#bbb',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                <span style={{ 
                  color: link.color, 
                  filter: hoveredLink === link.id ? `drop-shadow(0 0 8px ${link.glow})` : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {link.icon}
                </span>
                {link.label}
              </button>
            ))}
          </div>

          {/* Área de acciones */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Botón RESERVAR con efecto neón pulsante */}
            <button 
              onClick={() => navegar('/cotizacion')} 
              className="reservar-btn"
              style={{ 
                background: 'linear-gradient(135deg, #ff007f, #bd00ff)', 
                border: 'none', 
                padding: isMobile ? '8px 16px' : '10px 24px', 
                borderRadius: '50px', 
                color: '#fff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px', 
                transition: 'all 0.3s ease', 
                fontWeight: 800,
                fontSize: isMobile ? '0.75rem' : '0.85rem', 
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(255, 0, 127, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 0, 127, 0.6), 0 0 40px rgba(189, 0, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 0, 127, 0.4)';
              }}
            >
              <Calendar size={isMobile ? 14 : 15} style={{ animation: 'neonFlicker 2s infinite' }} />
              {isMobile ? 'RESERVAR' : 'RESERVAR FECHA'}
            </button>

            {/* Panel Admin con glow sutil */}
            <div 
              onClick={() => navegar('/admin')}
              style={{
                width: isMobile ? '36px' : '40px', 
                height: isMobile ? '36px' : '40px',
                borderRadius: '12px', 
                backgroundColor: 'rgba(7, 7, 28, 0.8)',
                border: '1px solid rgba(255, 0, 127, 0.3)', 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ff007f',
                cursor: 'pointer', 
                transition: 'all 0.3s ease', 
                boxSizing: 'border-box',
                backdropFilter: 'blur(10px)'
              }}
              title="Panel de Control Interno"
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = '#ff007f'; 
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 127, 0.5), inset 0 0 10px rgba(255, 0, 127, 0.1)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.3)'; 
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <Settings size={isMobile ? 16 : 18} />
            </div>

            {/* Hamburguesa móvil con animación */}
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                style={{ 
                  background: 'transparent', 
                  border: '1px solid rgba(0, 242, 254, 0.3)', 
                  borderRadius: '10px',
                  color: '#00f2fe', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  padding: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL FULLSCREEN CON EFECTO GLASSMORPHISM */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-enter" style={{
          position: 'fixed', 
          top: '56px', 
          left: 0, 
          width: '100%', 
          height: 'calc(100vh - 56px)',
          backgroundColor: 'rgba(3, 3, 12, 0.98)', 
          zIndex: 999, 
          padding: '30px 25px',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          fontFamily: "'Inter', sans-serif",
          borderTop: '1px solid rgba(0, 242, 254, 0.2)', 
          boxSizing: 'border-box',
          backdropFilter: 'blur(20px)'
        }}>
          {/* Header del menú móvil */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              overflow: 'hidden',
              border: '2px solid #00f2fe', 
              backgroundColor: '#fff', 
              padding: '2px'
            }}>
              <img src={miLogoOfficial} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '1.3rem', color: '#fff', letterSpacing: '2px' }}>
              GD <span style={{ color: '#ff007f' }}>PRODUCCIONES</span>
            </div>
          </div>

          {/* Links móviles con efectos */}
          {navLinks.map((link, index) => (
            <button 
              key={link.id}
              onClick={() => navegar(link.route)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                textAlign: 'left', 
                cursor: 'pointer',
                padding: '16px 20px',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.3s ease',
                borderLeft: `3px solid transparent`,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(90deg, ${link.color}15, transparent)`;
                e.currentTarget.style.borderLeft = `3px solid ${link.color}`;
                e.currentTarget.style.paddingLeft = '28px';
                e.currentTarget.style.boxShadow = `0 0 30px ${link.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderLeft = '3px solid transparent';
                e.currentTarget.style.paddingLeft = '20px';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ 
                color: link.color,
                filter: `drop-shadow(0 0 8px ${link.glow})`
              }}>
                {React.cloneElement(link.icon, { size: 24 })}
              </span>
              {link.label}
            </button>
          ))}

          {/* Separador decorativo */}
          <div style={{ 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, rgba(0,242,254,0.3), transparent)', 
            margin: '15px 0' 
          }} />

          {/* Botón de reserva destacado en móvil */}
          <button 
            onClick={() => navegar('/cotizacion')}
            style={{
              background: 'linear-gradient(135deg, #ff007f, #bd00ff)',
              border: 'none',
              color: '#fff',
              padding: '18px 24px',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(255, 0, 127, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginTop: '10px'
            }}
          >
            <Calendar size={22} />
            RESERVAR FECHA
          </button>

          {/* Footer del menú móvil */}
          <div style={{ 
            marginTop: 'auto', 
            paddingTop: '20px',
            textAlign: 'center',
            color: '#555',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
              <div className="eq-bar-nav" style={{ animationDuration: '0.5s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.7s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.4s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.6s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.8s' }} />
            </div>
            La fiesta no para
          </div>
        </div>
      )}
    </>
  );
}