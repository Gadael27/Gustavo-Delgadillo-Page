import React, { useState, useEffect } from 'react';
import { 
  Truck, ArrowRight, ShieldCheck, Play, Sparkles, 
  Music, Zap, Disc, Headphones, Star, MapPin, 
  Calendar, ChevronRight, Volume2, PartyPopper
} from 'lucide-react';

// 📸 GALERÍA COMPLETA DE FOTOS REALES DEL PROYECTO
import heroBackground from '../assets/hero.png';
import showLasers from '../assets/40e7af3d-94f8-418e-bfe0-6e7f11e86996.jpg';
import disparoCo2 from '../assets/160523.jpg';
import cabinaDenonPista from '../assets/AE69E51A-CF1E-409E-8899-B4E2D45FB79F.jpg';
import escenarioGalactus from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
import setupJardin from '../assets/IMG_4921.JPG';
import consolaCloseup from '../assets/BB8F1BA0-38B6-4B43-8F62-B3A346AB7D5C.jpg';
import consolaDJ from '../assets/IMG_4911.JPG';
import setupExterior2 from '../assets/IMG_5401.JPG';
import setupExterior3 from '../assets/IMG_5404.JPG';

// 🎥 VIDEOS DEL PROYECTO
import videoShowUrl from '../assets/IMG_5404.MP4?url';
import videoGenteBailando from '../assets/IMG_2958.MOV?url';
import videoConsolaYBailando from '../assets/FE8097BE-2C22-4D19-89BA-407922426329.mp4?url';

// Icono Instagram inline (lucide no incluye marcas comerciales)
const InstagramIcon = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Home() {
  const [activeGenre, setActiveGenre] = useState('reggaeton');

  const irACotizar = (tipoPaquete) => {
    window.location.href = `/cotizacion?paquete=${tipoPaquete}`;
  };

  const abrirWhatsApp = () => {
    const tuNumeroWhatsapp = "525567880698"; 
    const mensajePredeterminado = encodeURIComponent("¡Hola, GD Producciones! Me interesa cotizar un evento fuera de la CDMX y agendar una producción especial.");
    const linkCompletoWA = `https://wa.me/${tuNumeroWhatsapp}?text=${mensajePredeterminado}`;
    window.open(linkCompletoWA, '_blank', 'noopener,noreferrer');
  };

  const tuNumeroWhatsapp = "525567880698"; 
  const mensajePredeterminado = encodeURIComponent("¡Hola, GD Producciones! Me interesa cotizar un evento fuera de la CDMX y agendar una producción especial.");
  const linkCompletoWA = `https://wa.me/${tuNumeroWhatsapp}?text=${mensajePredeterminado}`;

  const genres = [
    { id: 'reggaeton', name: 'Reggaetón', icon: <Music size={16} />, color: '#ff007f' },
    { id: 'electronic', name: 'Electrónica', icon: <Zap size={16} />, color: '#00f2fe' },
    { id: 'cumbia', name: 'Cumbia/Banda', icon: <Disc size={16} />, color: '#ffeb3b' },
    { id: 'rock', name: 'Rock/Indie', icon: <Headphones size={16} />, color: '#ff5e00' },
    { id: 'open', name: 'Formato Abierto', icon: <Sparkles size={16} />, color: '#bd00ff' },
  ];

  const testimonials = [
    { name: "Mariana & Luis", event: "Boda - Guadalajara", text: "¡La pista NUNCA estuvo vacía! El mejor DJ de la ciudad, sin duda.", rating: 5 },
    { name: "Corp. TechVision", event: "Evento Corporativo", text: "Profesionalismo de otro nivel. El montaje truss fue espectacular.", rating: 5 },
    { name: "Fernanda R.", event: "XV Años", text: "Hasta mi abuela bailó. Mezcla impecable y la cabina es un show aparte.", rating: 5 },
  ];

  const sets = [
    { title: "Set Reggaetón Old School", duration: "45 min", plays: "2.4k", color: "#ff007f" },
    { title: "Electro House Fiesta", duration: "60 min", plays: "1.8k", color: "#00f2fe" },
    { title: "Cumbia Remix En Vivo", duration: "50 min", plays: "3.1k", color: "#ffeb3b" },
  ];

  return (
    <div style={{ 
      backgroundColor: '#03030c', 
      color: '#fff', 
      minHeight: '100vh', 
      fontFamily: "'Segoe UI', system-ui, sans-serif", 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;800&display=swap');
        
        :root {
          --neon-pink: #ff007f;
          --neon-cyan: #00f2fe;
          --neon-yellow: #ffeb3b;
          --bg-dark: #03030c;
          --bg-card: #07071c;
          --border-subtle: rgba(255,255,255,0.08);
        }

        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .glitch-hover:hover {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          color: var(--neon-cyan);
        }

        @keyframes eq {
          0%, 100% { height: 10%; }
          50% { height: 100%; }
        }
        .eq-bar {
          width: 4px;
          background: linear-gradient(to top, var(--neon-pink), var(--neon-cyan));
          border-radius: 2px;
          animation: eq 1s ease-in-out infinite;
        }
        .eq-bar:nth-child(1) { animation-duration: 0.8s; }
        .eq-bar:nth-child(2) { animation-duration: 1.1s; }
        .eq-bar:nth-child(3) { animation-duration: 0.9s; }
        .eq-bar:nth-child(4) { animation-duration: 1.2s; }
        .eq-bar:nth-child(5) { animation-duration: 0.7s; }

        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        .vinyl-spin { animation: spin 4s linear infinite; }
        .vinyl-spin-slow { animation: spin 8s linear infinite; }

        @keyframes neonPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px var(--neon-pink); }
          50% { opacity: 0.8; box-shadow: 0 0 40px var(--neon-cyan); }
        }
        .neon-pulse { animation: neonPulse 3s ease-in-out infinite; }

        @keyframes laserLine {
          0% { transform: translateX(-100%) rotate(-25deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateX(200%) rotate(-25deg); opacity: 0; }
        }
        .laser {
          position: absolute; width: 800px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--neon-cyan), #fff, var(--neon-pink), transparent);
          box-shadow: 0 0 15px var(--neon-cyan); 
          animation: laserLine 8s linear infinite; 
          z-index: 2; pointer-events: none;
        }

        .glass-card {
          background: rgba(7, 7, 28, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .glass-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 0, 127, 0.4);
          box-shadow: 0 20px 40px rgba(255, 0, 127, 0.15);
        }

        .media-v2 {
          position: relative; border-radius: 20px; overflow: hidden;
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          transition: all 0.5s ease;
        }
        .media-v2:hover {
          transform: scale(1.02);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }
        .media-v2 img, .media-v2 video {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s ease, filter 0.3s;
          filter: saturate(0.85);
        }
        .media-v2:hover img, .media-v2:hover video {
          transform: scale(1.1);
          filter: saturate(1.2) contrast(1.1);
        }

        .video-play-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.3);
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .media-v2:hover .video-play-overlay {
          opacity: 1;
        }

        @keyframes waPulseNeon {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .wa-float {
          position: fixed; bottom: 30px; right: 30px;
          background: #25d366; width: 64px; height: 64px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          z-index: 9999; cursor: pointer;
          animation: waPulseNeon 2.5s infinite;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .wa-float:hover { transform: scale(1.15) translateY(-5px); background: #20ba5a; }

        .genre-tag {
          padding: 10px 20px; border-radius: 50px; cursor: pointer;
          border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.03);
          transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;
          font-weight: 600; font-size: 0.9rem;
        }
        .genre-tag.active {
          background: rgba(255, 0, 127, 0.15); border-color: var(--neon-pink);
          color: var(--neon-pink); box-shadow: 0 0 20px rgba(255, 0, 127, 0.2);
        }

        .playlist-item {
          display: flex; align-items: center; gap: 16px; padding: 16px 20px;
          border-radius: 16px; border: 1px solid var(--border-subtle);
          background: rgba(255,255,255,0.02); margin-bottom: 12px;
          transition: all 0.3s ease; cursor: pointer;
        }
        .playlist-item:hover {
          background: rgba(255, 0, 127, 0.08); border-color: rgba(255, 0, 127, 0.3);
          transform: translateX(8px);
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #03030c; }
        ::-webkit-scrollbar-thumb { background: #1a1a3e; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--neon-pink); }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .masonry-grid { grid-template-columns: 1fr !important; }
          .masonry-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; height: 280px !important; }
          .hero-title { font-size: 3.2rem !important; }
          .section-title { font-size: 2.2rem !important; }
          .hero-section { height: auto !important; min-height: 100vh; padding: 120px 20px 80px !important; }
          .wa-float { width: 56px; height: 56px; bottom: 20px; right: 20px; }
        }
      `}</style>

      {/* 🟢 BOTÓN FLOTANTE WA */}
      <button 
        onClick={abrirWhatsApp}
        className="wa-float" 
        title="Contactar por WhatsApp"
        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>

      {/* 🌌 HERO SECTION */}
      <div id="inicio" className="hero-section" style={{ 
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', 
        backgroundImage: `linear-gradient(to bottom, rgba(3,3,12,0.3) 0%, rgba(3,3,12,0.7) 50%, #03030c 100%), url(${heroBackground})`, 
        backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden',
        padding: '0 20px'
      }}>
        <div className="laser" style={{ top: '30%' }} />
        <div className="laser" style={{ top: '60%', animationDelay: '4s', background: 'linear-gradient(90deg, transparent, #ff007f, #fff, transparent)' }} />
        
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#ff007f' : '#00f2fe',
              opacity: 0.3,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              boxShadow: `0 0 20px ${i % 2 === 0 ? '#ff007f' : '#00f2fe'}`,
              animation: `float ${5 + i}s ease-in-out infinite alternate`
            }} />
          ))}
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          <div>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '10px', 
              background: 'rgba(255, 0, 127, 0.1)', border: '1px solid rgba(255, 0, 127, 0.3)', 
              padding: '10px 20px', borderRadius: '50px', marginBottom: '30px',
              color: '#fff', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px',
              backdropFilter: 'blur(10px)'
            }}>
              <Sparkles size={14} color="#ffeb3b" /> FORMATO ABIERTO • MEZCLA EN VIVO
            </div>

            <h1 className="font-cyber hero-title glitch-hover" style={{ 
              fontSize: '5.5rem', margin: '0', lineHeight: '0.95', 
              color: '#fff', textShadow: '0 0 40px rgba(255,0,127,0.5)',
              cursor: 'default'
            }}>
              LA FIESTA<br />
              <span style={{ color: '#ff007f' }}>NO PARA</span>
            </h1>

            <p style={{ 
              fontSize: '1.25rem', color: '#ccc', maxWidth: '500px', 
              margin: '25px 0 35px 0', lineHeight: '1.6', fontWeight: 300 
            }}>
              Bodas, XV años y eventos corporativos que nadie olvida. 
              Producción audiovisual masiva, consolas HiFi e iluminación robótica sincronizada.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => irACotizar('Base')} style={{
                background: 'linear-gradient(135deg, #ff007f, #bd00ff)', color: '#fff',
                border: 'none', padding: '18px 36px', borderRadius: '50px',
                fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 10px 30px rgba(255,0,127,0.4)',
                transition: 'all 0.3s ease', letterSpacing: '1px'
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,0,127,0.6)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,0,127,0.4)'; }}>
                COTIZAR MI EVENTO <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={abrirWhatsApp}
                style={{
                background: 'rgba(255,255,255,0.05)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)', padding: '18px 36px',
                borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
                backdropFilter: 'blur(10px)', transition: 'all 0.3s', cursor: 'pointer'
              }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff'; }}
                 onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WHATSAPP
              </button>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '30px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '4px', height: '30px', alignItems: 'end' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="eq-bar" style={{ height: '100%' }} />
                ))}
              </div>
              <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 500 }}>
                Escuchando ahora: <span style={{ color: '#00f2fe' }}>Set En Vivo - GD Producciones</span>
              </span>
            </div>
          </div>

          <div className="hide-mobile" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '320px', height: '320px', borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #ff007f, #00f2fe, #ffeb3b, #ff007f)',
              padding: '4px', boxShadow: '0 0 60px rgba(255,0,127,0.3)',
              position: 'relative'
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: `url(${escenarioGalactus}) center/cover`,
                position: 'relative', overflow: 'hidden'
              }} className="vinyl-spin-slow">
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 12px)'
                }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: '80px', height: '80px', borderRadius: '50%', background: '#03030c',
                  border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Disc size={32} color="#ff007f" />
                </div>
              </div>
            </div>
            
            <div style={{
              position: 'absolute', top: '20px', right: '0',
              background: 'rgba(7,7,28,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,242,254,0.3)', borderRadius: '16px',
              padding: '16px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f2fe' }}>500+</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Eventos realizados</div>
            </div>
            
            <div style={{
              position: 'absolute', bottom: '40px', left: '0',
              background: 'rgba(7,7,28,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,0,127,0.3)', borderRadius: '16px',
              padding: '16px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff007f' }}>10+</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* GÉNEROS */}
        <div style={{ textAlign: 'center', margin: '100px 0 60px' }}>
          <h2 className="font-cyber section-title" style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>
            ¿QUÉ SUENA EN TU <span style={{ color: '#ff007f' }}>FIESTA</span>?
          </h2>
          <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '40px' }}>
            Selecciona un género y escucha cómo transformamos la pista
          </p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
            {genres.map(g => (
              <button 
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`genre-tag ${activeGenre === g.id ? 'active' : ''}`}
                style={{ color: activeGenre === g.id ? g.color : '#aaa' }}
              >
                {g.icon} {g.name}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center',
            background: 'linear-gradient(135deg, #07071c, #0d0d2a)', borderRadius: '28px',
            padding: '40px', border: '1px solid rgba(255,255,255,0.05)'
          }} className="grid-2">
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Volume2 size={24} color={genres.find(g => g.id === activeGenre)?.color || '#ff007f'} />
                <span style={{ 
                  color: genres.find(g => g.id === activeGenre)?.color || '#ff007f',
                  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase'
                }}>
                  Reproduciendo ahora
                </span>
              </div>
              <h3 className="font-cyber" style={{ fontSize: '2.5rem', margin: '0 0 15px 0' }}>
                {genres.find(g => g.id === activeGenre)?.name.toUpperCase()}
              </h3>
              <p style={{ color: '#aaa', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '25px' }}>
                {activeGenre === 'reggaeton' && "Desde el clásico hasta el perreo intenso. Transiciones perfectas que mantienen la pista prendida toda la noche."}
                {activeGenre === 'electronic' && "House, Techno, EDM y Progressive. Beats que elevan la energía y crean momentos épicos en la pista."}
                {activeGenre === 'cumbia' && "La esencia mexicana con toques modernos. Cumbia rebajada, sonidera y banda para todos los gustos."}
                {activeGenre === 'rock' && "Alternativo, Indie, Clásicos en inglés y español. Para esos momentos de pura energía y nostalgia."}
                {activeGenre === 'open' && "¿Por qué elegir uno solo? Mezclamos TODO en vivo. Del reggaetón al rock en segundos sin cortes abruptos."}
              </p>
              <div style={{ display: 'flex', gap: '8px', height: '40px', alignItems: 'end', opacity: 0.6 }}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="eq-bar" style={{ 
                    width: '6px', 
                    animationDuration: `${0.5 + Math.random()}s`,
                    background: genres.find(g => g.id === activeGenre)?.color || '#ff007f'
                  }} />
                ))}
              </div>
            </div>
            <div style={{ 
              borderRadius: '20px', overflow: 'hidden', height: '300px',
              border: `2px solid ${genres.find(g => g.id === activeGenre)?.color || '#ff007f'}40`,
              boxShadow: `0 0 40px ${genres.find(g => g.id === activeGenre)?.color || '#ff007f'}20`
            }}>
              <img 
                src={activeGenre === 'electronic' ? showLasers : activeGenre === 'cumbia' ? escenarioGalactus : cabinaDenonPista} 
                alt="DJ en acción" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s' }}
              />
            </div>
          </div>
        </div>

        {/* 🎥 GALERÍA MASONRY COMPLETA - SIN REPETIR FOTOS */}
        <div id="galería" style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="font-cyber section-title" style={{ fontSize: '3rem', margin: '0' }}>
              ASÍ SE VIVE LA <span style={{ color: '#00f2fe' }}>ENERGÍA</span>
            </h2>
            <p style={{ color: '#666', marginTop: '10px', fontSize: '1.1rem' }}>
              Producciones reales. Pistas llenas. Momentos épicos.
            </p>
          </div>

          <div className="masonry-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gridAutoRows: '260px',
            gap: '20px' 
          }}>
            {/* 1. Video Show Láser - Grande arriba izquierda */}
            <div className="media-v2" style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
              <video src={videoShowUrl} autoPlay loop muted playsInline style={{ height: '100%' }} />
              <div style={{ 
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(255,0,127,0.9)', padding: '6px 14px',
                borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '6px', zIndex: 5
              }}>
                <Play size={12} fill="#fff" /> ILUMINACIÓN SYNCHRO
              </div>
              <div style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '30px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5
              }}>
                <h3 className="font-cyber" style={{ fontSize: '1.8rem', margin: 0 }}>SHOW LASER EN VIVO</h3>
                <p style={{ color: '#aaa', margin: '5px 0 0', fontSize: '0.9rem' }}>Estructuras Truss con cabezas Beam programadas al ritmo</p>
              </div>
            </div>

            {/* 2. Consola DJ (IMG_4911) - Derecha arriba */}
            <div className="media-v2" style={{ gridRow: 'span 2' }}>
              <img src={consolaDJ} alt="Equipo de DJ profesional" style={{ height: '100%' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.5rem', color: '#00f2fe', margin: 0 }}>EQUIPO PROFESIONAL</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0 0' }}>Consolas digitales de última generación</p>
              </div>
            </div>

            {/* 3. Setup Jardín (IMG_4921) */}
            <div className="media-v2">
              <img src={setupJardin} alt="Montaje en jardín" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#ffeb3b', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> MONTAJE EXTERIOR
                </h4>
              </div>
            </div>

            {/* 4. Setup Exterior 2 (IMG_5401) */}
            <div className="media-v2">
              <img src={setupExterior2} alt="Producción en exterior" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Music size={16} /> PRODUCCIÓN COMPLETA
                </h4>
              </div>
            </div>

            {/* 5. Video Gente Bailando (IMG_2958) - Grande medio */}
            <div className="media-v2" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
              <video src={videoGenteBailando} autoPlay loop muted playsInline style={{ height: '100%' }} />
              <div className="video-play-overlay">
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,0,127,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={28} fill="#fff" color="#fff" />
                </div>
              </div>
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,242,254,0.9)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#03030c', zIndex: 5, letterSpacing: '1px' }}>
                PISTA LLENA
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h3 className="font-cyber" style={{ fontSize: '2rem', margin: 0 }}>LA GENTE NO PARA</h3>
                <p style={{ color: '#aaa', margin: '5px 0 0', fontSize: '0.9rem' }}>Ambiente real de pista de baile</p>
              </div>
            </div>

            {/* 6. Setup Exterior 3 (IMG_5404) */}
            <div className="media-v2">
              <img src={setupExterior3} alt="Montaje audiovisual" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#ff007f', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} /> AUDIOVISUAL
                </h4>
              </div>
            </div>

            {/* 7. Vista desde Cabina (AE69E51A) - Ancho abajo */}
            <div className="media-v2" style={{ gridColumn: 'span 2' }}>
              <img src={cabinaDenonPista} alt="Vista desde la cabina hacia la pista" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.5rem', color: '#00f2fe', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Music size={16} /> VISTA DESDE CABINA MASTER
                </h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0 0' }}>Sistemas Denon de alta fidelidad</p>
              </div>
            </div>

            {/* 8. Consola Closeup (BB8F1BA0) */}
            <div className="media-v2" style={{ gridRow: 'span 2' }}>
              <img src={consolaCloseup} alt="Detalle de consola Denon" style={{ height: '100%' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.5rem', color: '#ff007f', margin: 0 }}>DETALLE EN CABINA</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0 0' }}>Control total de la mezcla</p>
              </div>
            </div>

            {/* 9. Escenario Diamante (Cabina DJ Blanca...) - Ancho */}
            <div className="media-v2" style={{ gridColumn: 'span 2' }}>
              <img src={escenarioGalactus} alt="Escenario completo con iluminación" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.5rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> ESCENARIO COMPLETO
                </h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0 0' }}>Pantallas interconectadas y fachadas 3D</p>
              </div>
            </div>

            {/* 10. Show Láser (40e7af3d...) */}
            <div className="media-v2">
              <img src={showLasers} alt="Show de rayos láser" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#ff007f', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} /> BARRIDO LÁSER
                </h4>
              </div>
            </div>

            {/* 11. Video Consola + Gente (FE8097BE...) */}
            <div className="media-v2" style={{ gridColumn: 'span 2' }}>
              <video src={videoConsolaYBailando} autoPlay loop muted playsInline style={{ height: '100%' }} />
              <div className="video-play-overlay">
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,242,254,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={22} fill="#fff" color="#fff" />
                </div>
              </div>
              <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(255,235,59,0.9)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, color: '#03030c', zIndex: 5 }}>
                BEHIND THE DECKS
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#ffeb3b', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Music size={14} /> DESDE LA CONSOLA
                </h4>
              </div>
            </div>

            {/* 12. Disparo CO2 (160523) */}
            <div className="media-v2">
              <img src={disparoCo2} alt="Efectos especiales CO2" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(3,3,12,0.95))', zIndex: 5 }}>
                <h4 className="font-cyber" style={{ fontSize: '1.3rem', color: '#ffeb3b', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> CO2 FX
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* SETS */}
        <div id="sets" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-2">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff007f', marginBottom: '15px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.9rem' }}>
                <Disc size={20} className="vinyl-spin" /> SETS RECIENTES
              </div>
              <h2 className="font-cyber section-title" style={{ fontSize: '3rem', margin: '0 0 20px 0', lineHeight: '1' }}>
                ESCUCHA ANTES DE <span style={{ color: '#00f2fe' }}>CONTRATAR</span>
              </h2>
              <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '30px', fontSize: '1.05rem' }}>
                Nuestros sets no son playlists automáticas. Son mezclas en vivo, 
                leídas de la pista, con transiciones limpias y energía calculada.
              </p>
              
              <div style={{ marginTop: '20px' }}>
                {sets.map((set, idx) => (
                  <div key={idx} className="playlist-item">
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: `linear-gradient(135deg, ${set.color}40, ${set.color}20)`,
                      border: `1px solid ${set.color}60`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: set.color, flexShrink: 0
                    }}>
                      <Play size={20} fill={set.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{set.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', gap: '12px' }}>
                        <span>{set.duration}</span>
                        <span>•</span>
                        <span>{set.plays} reproducciones</span>
                      </div>
                    </div>
                    <ChevronRight size={20} color="#444" />
                  </div>
                ))}
              </div>

              <button style={{
                marginTop: '25px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', padding: '12px 28px', borderRadius: '50px',
                cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s',
                display: 'inline-flex', alignItems: 'center', gap: '8px'
              }} onMouseEnter={e => { e.target.style.borderColor = '#00f2fe'; e.target.style.color = '#00f2fe'; }}
                 onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = '#fff'; }}>
                Ver todos los sets <ArrowRight size={16} />
              </button>
            </div>

            <div className="hide-mobile" style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}>
                <img src={consolaCloseup} alt="Setup" style={{ width: '100%', display: 'block' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(3,3,12,0.8) 0%, transparent 50%)',
                  display: 'flex', alignItems: 'end', padding: '30px'
                }}>
                  <div>
                    <div style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(0,242,254,0.15)', border: '1px solid rgba(0,242,254,0.4)',
                      padding: '6px 14px', borderRadius: '20px', marginBottom: '10px',
                      color: '#00f2fe', fontSize: '0.8rem', fontWeight: 700
                    }}>
                      <Zap size={12} /> LIVE MIXING
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>Consolas Denon Prime 4</div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>Mezcla totalmente en vivo</div>
                  </div>
                </div>
              </div>
              
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #ff007f, #bd00ff)',
                opacity: 0.8, zIndex: -1, filter: 'blur(30px)'
              }} />
            </div>
          </div>
        </div>

        {/* TESTIMONIOS */}
        <div style={{ marginBottom: '100px' }}>
          <h2 className="font-cyber section-title" style={{ fontSize: '3rem', textAlign: 'center', margin: '0 0 50px 0' }}>
            LA GENTE <span style={{ color: '#ffeb3b' }}>BAILA</span> Y LO DICE
          </h2>
          
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '35px 30px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={18} fill="#ffeb3b" color="#ffeb3b" />
                  ))}
                </div>
                <p style={{ 
                  fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd', margin: '0 0 25px 0',
                  fontStyle: 'italic'
                }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${i === 0 ? '#ff007f' : i === 1 ? '#00f2fe' : '#ffeb3b'}, #03030c)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '1.1rem', color: '#fff'
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAQUETES */}
        <div id="paquetes" style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="font-cyber section-title" style={{ fontSize: '3rem', margin: '0' }}>
              ELIGE TU <span style={{ color: '#ff007f' }}>EXPERIENCIA</span>
            </h2>
            <p style={{ color: '#666', marginTop: '10px', fontSize: '1.1rem' }}>
              Apartado seguro vía Mercado Pago. Fechas limitadas.
            </p>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
            <div className="glass-card" style={{ padding: '45px 35px', borderRadius: '28px', cursor: 'pointer' }} onClick={() => irACotizar('Base')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div>
                  <h3 className="font-cyber" style={{ fontSize: '2.2rem', color: '#00f2fe', margin: '0' }}>PAQUETE BASE</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>Para eventos íntimos de hasta 100 personas</p>
                </div>
                <div style={{ 
                  padding: '8px 16px', borderRadius: '20px', background: 'rgba(0,242,254,0.1)',
                  border: '1px solid rgba(0,242,254,0.3)', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 700
                }}>
                  POPULAR
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255,255,255,0.05)', 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                padding: '25px 0', marginBottom: '25px' 
              }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', lineHeight: '1' }}>
                  $5,500 <span style={{ fontSize: '1rem', color: '#666', fontWeight: 400 }}>MXN</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 35px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  '5 Horas continuas de show abierto',
                  'Sistema de Audio Profesional Lineal',
                  'Cabina DJ iluminada + Tótems LED',
                  '1 DJ + Asistente técnico',
                  'Playlist personalizada previa'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', fontSize: '0.95rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,242,254,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={12} color="#00f2fe" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button style={{
                width: '100%', padding: '16px', borderRadius: '14px',
                background: 'rgba(0,242,254,0.1)', border: '1px solid rgba(0,242,254,0.4)',
                color: '#00f2fe', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                transition: 'all 0.3s'
              }} onMouseEnter={e => { e.target.style.background = '#00f2fe'; e.target.style.color = '#03030c'; }}
                 onMouseLeave={e => { e.target.style.background = 'rgba(0,242,254,0.1)'; e.target.style.color = '#00f2fe'; }}>
                COTIZAR PAQUETE BASE
              </button>
            </div>

            <div style={{ 
              padding: '45px 35px', borderRadius: '28px', cursor: 'pointer',
              background: 'linear-gradient(135deg, #0a0a24, #150820)',
              border: '2px solid #ff007f', position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 60px rgba(255,0,127,0.15)'
            }} onClick={() => irACotizar('Premium')}>
              <div style={{
                position: 'absolute', top: '20px', right: '-35px',
                background: '#ff007f', color: '#fff', padding: '8px 40px',
                transform: 'rotate(45deg)', fontSize: '0.75rem', fontWeight: 800,
                letterSpacing: '2px', boxShadow: '0 4px 15px rgba(255,0,127,0.4)'
              }}>
                RECOMENDADO
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 className="font-cyber" style={{ fontSize: '2.2rem', color: '#ff007f', margin: '0' }}>PAQUETE PREMIUM</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '8px' }}>Gran escala. Impacto visual total. +100 personas.</p>
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255,0,127,0.2)', 
                borderBottom: '1px solid rgba(255,0,127,0.2)', 
                padding: '25px 0', marginBottom: '25px' 
              }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#ffeb3b', lineHeight: '1' }}>
                  $7,500 <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 400 }}>MXN</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 35px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'TODO lo del paquete Base',
                  'Rigging completo de estructuras Truss',
                  'Ingeniero de iluminación dedicado',
                  'Audio reforzado con subbajos extra',
                  'Cabina Premium (Diamante o Espejos)',
                  'Efectos especiales CO2 opcionales'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '0.95rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,0,127,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Star size={12} color="#ff007f" fill="#ff007f" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="neon-pulse" style={{
                width: '100%', padding: '16px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #ff007f, #bd00ff)', border: 'none',
                color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                transition: 'all 0.3s', letterSpacing: '1px'
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                QUIERO LO PREMIUM <PartyPopper size={20} style={{ marginLeft: '8px', display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </div>
          </div>
        </div>

        {/* FORÁNEA */}
        <div style={{ 
          padding: '60px 40px', borderRadius: '28px', marginBottom: '80px',
          background: 'linear-gradient(135deg, #050518, #0d0624)',
          border: '1px solid rgba(0,242,254,0.2)', textAlign: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          <div className="laser" style={{ top: '50%', animationDuration: '12s' }} />
          
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              color: '#00f2fe', fontSize: '0.9rem', fontWeight: 700,
              letterSpacing: '3px', marginBottom: '20px'
            }}>
              <Truck size={20} /> LOGÍSTICA NACIONAL
            </div>
            
            <h2 className="font-cyber" style={{ fontSize: '3rem', margin: '0 0 20px 0', lineHeight: '1.1' }}>
              ¿TU EVENTO ES FUERA DE <span style={{ color: '#ff007f' }}>CDMX</span>?
            </h2>
            
            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '35px' }}>
              Llevamos el arsenal completo a cualquier estado de la República. 
              Audio lineal, iluminación robótica Truss y efectos especiales incluidos. 
              Cotizamos viáticos personalizados y aseguramos tu fecha.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
              {['Jalisco', 'Nuevo León', 'Quintana Roo', 'Puebla', 'Guanajuato'].map(state => (
                <div key={state} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '20px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#888', fontSize: '0.85rem'
                }}>
                  <MapPin size={14} /> {state}
                </div>
              ))}
            </div>

            <button
              onClick={abrirWhatsApp}
              style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#25d366', color: '#fff', padding: '18px 40px',
              borderRadius: '50px', fontSize: '1.2rem', fontWeight: 800,
              textDecoration: 'none', boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
              transition: 'all 0.3s', border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer'
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(37,211,102,0.5)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)'; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              COTIZAR EVENTO FORÁNEO
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          padding: '60px 0 40px', 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr 1fr', 
          gap: '40px',
          alignItems: 'start'
        }} className="grid-2">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, #ff007f, #00f2fe)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Headphones size={20} color="#fff" />
              </div>
              <span className="font-cyber" style={{ fontSize: '1.5rem' }}>GD PRODUCCIONES</span>
            </div>
            <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem', maxWidth: '300px' }}>
              Transformamos eventos en experiencias audiovisuales inolvidables. 
              CDMX y toda la República Mexicana.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' }}>Navegación</h4>
            {['Inicio', 'Galería', 'Sets', 'Paquetes'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ 
                display: 'block', color: '#666', textDecoration: 'none', 
                marginBottom: '12px', fontSize: '0.9rem', transition: 'color 0.3s'
              }} onMouseEnter={e => e.target.style.color = '#ff007f'}
                 onMouseLeave={e => e.target.style.color = '#666'}>
                {item}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' }}>Legal</h4>
            {['Términos y condiciones', 'Política de apartados', 'Cancelaciones'].map(item => (
              <a key={item} href="#" style={{ 
                display: 'block', color: '#666', textDecoration: 'none', 
                marginBottom: '12px', fontSize: '0.9rem', transition: 'color 0.3s'
              }} onMouseEnter={e => e.target.style.color = '#ff007f'}
                 onMouseLeave={e => e.target.style.color = '#666'}>
                {item}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' }}>Síguenos</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', transition: 'all 0.3s'
              }} onMouseEnter={e => { e.currentTarget.style.background = '#ff007f'; e.currentTarget.style.borderColor = '#ff007f'; }}
                 onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                <InstagramIcon size={18} color="#fff" />
              </a>
              <a href="#" style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', transition: 'all 0.3s'
              }} onMouseEnter={e => { e.currentTarget.style.background = '#00f2fe'; e.currentTarget.style.borderColor = '#00f2fe'; }}
                 onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </footer>

        <div style={{ textAlign: 'center', padding: '30px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <p style={{ color: '#444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#25d366" /> 
            Pagos seguros • Leads protegidos en Firebase Firestore • GD Producciones © 2026
          </p>
        </div>

      </div>
    </div>
  );
}