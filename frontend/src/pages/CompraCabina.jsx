import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, ShieldCheck, ExternalLink, SlidersHorizontal, 
  X, ZoomIn, ChevronLeft, ChevronRight, Star, Sparkles, 
  Ruler, Palette, Clock, CheckCircle2, MapPin, Wrench
} from 'lucide-react';

// Importaciones de cabinas (todos los nombres exactos de tu captura)
import cabinaBlanca4Diamantes from '../assets/Cabina DJ Blanca 4 diamantes frente.jpeg';
import cabinaBlancaDiamanteFrente from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
import cabinaBlancaDiamanteLateral from '../assets/Cabina DJ Blanca Diamante Lateral.jpeg';
import cabinaBlancaTriangulos from '../assets/Cabina DJ Blanca Triangulos.jpeg';
import cabinaOroEspejo from '../assets/Cabina DJ diamante Oro tipo espejo frente.jpeg';
import cabinaPlataEspejo from '../assets/Cabina DJ Diamante Plata tipo espejo frente.jpeg';
import cabinaNegraDiamanteFrente2 from '../assets/Cabina DJ negra Diamante frente 2.jpeg';
import cabinaNegraDiamanteFrente from '../assets/Cabina DJ Negra Diamante frente.jpeg';
import cabinaNegraDiamanteLateral from '../assets/Cabina DJ Negra Diamante Lateral.jpeg';
import cabinaNegraRayado from '../assets/Cabina DJ Negra Rayado.jpeg';
import cabinaNegraTriangulos from '../assets/Cabina DJ Negra Triangulos.jpeg';

export default function CompraCabina() {
  const [filterColor, setFilterColor] = useState('Todos');
  const [selectedCabina, setSelectedCabina] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Todas las cabinas con sus variantes de imagen y nueva data estructurada
  const cabinas = [
    {
      id: 1,
      nombre: 'Cabina Negra Diamante Premium',
      descripcion: 'Mueble de carpintería fina con corte geométrico en relieve tipo diamante. Acabado negro mate de alta resistencia al rayado y humedad.',
      color: 'Negro',
      precio: '8,500',
      tag: 'Best Seller',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaNegraDiamanteFrente, cabinaNegraDiamanteLateral, cabinaNegraDiamanteFrente2],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Corte diamante 3D', 'Acabado negro mate', 'Patas ajustables', 'Portacables integrado'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 2,
      nombre: 'Cabina Blanca Diamante Luxury',
      descripcion: 'Estructura modular blanca con diseño de diamantes tridimensionales. Ideal para bodas de gala y eventos corporativos de alto nivel.',
      color: 'Blanco',
      precio: '8,900',
      tag: 'Premium',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaBlancaDiamanteFrente, cabinaBlancaDiamanteLateral, cabinaBlanca4Diamantes],
      specs: { material: 'Madera MDF Premium', peso: '19kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Diamantes tridimensionales', 'Blanco satinado', 'Resistente a manchas', 'Diseño modular'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 3,
      nombre: 'Cabina Diamante Espejo Oro',
      descripcion: 'Edición especial con caras reflejantes en acabado acrílico tipo espejo dorado. Máxima presencia escénica garantizada.',
      color: 'Oro/Espejo',
      precio: '11,200',
      tag: 'Edición Limitada',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaOroEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '22kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Acrílico espejo dorado', 'Efecto reflectante total', 'Estructura reforzada', 'Iluminación LED compatible'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 4,
      nombre: 'Cabina Diamante Espejo Plata',
      descripcion: 'Fachada reflectante plata tipo espejo con cortes diagonales de precisión. Estructura robusta y ligera de armar.',
      color: 'Plata/Espejo',
      precio: '10,800',
      tag: 'Exclusivo',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaPlataEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '21kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Espejo plata premium', 'Cortes diagonales', 'Ligera y robusta', 'Montaje rápido'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 5,
      nombre: 'Cabina Negra Triángulos Rave',
      descripcion: 'Diseño geométrico lineal basado en patrones triangulares abstractos. Ideal para iluminación perimetral LED RGB.',
      color: 'Negro',
      precio: '7,900',
      tag: 'A medida',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaNegraTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Patrón triangular abstracto', 'Compatible LED RGB', 'Diseño rave/festival', 'Superficie difusora'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 6,
      nombre: 'Cabina Negra Minimal Rayado',
      descripcion: 'Líneas paralelas fresadas sobre madera premium con acabado negro satinado de alta durabilidad. Elegancia minimalista.',
      color: 'Negro',
      precio: '8,200',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaNegraRayado],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Líneas paralelas fresadas', 'Acabado satinado', 'Minimalista', 'Alta durabilidad'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 7,
      nombre: 'Cabina Blanca Triángulos',
      descripcion: 'Versión blanca del diseño triangular con acabado satinado. Perfecta para eventos diurnos y exteriores.',
      color: 'Blanco',
      precio: '8,400',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      imagenes: [cabinaBlancaTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Triángulos en blanco', 'Ideal exteriores', 'Satinado premium', 'Ligera'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    }
  ];

  const coloresDisponibles = ['Todos', 'Negro', 'Blanco', 'Oro/Espejo', 'Plata/Espejo'];

  const cabinasFiltradas = filterColor === 'Todos' 
    ? cabinas 
    : cabinas.filter(c => c.color === filterColor);

  const abrirModal = (cabina) => {
    setSelectedCabina(cabina);
    setCurrentImageIndex(0);
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const cerrarModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedCabina(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  const siguienteImagen = () => {
    if (selectedCabina) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCabina.imagenes.length);
    }
  };

  const anteriorImagen = () => {
    if (selectedCabina) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCabina.imagenes.length) % selectedCabina.imagenes.length);
    }
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') cerrarModal();
      if (e.key === 'ArrowRight') siguienteImagen();
      if (e.key === 'ArrowLeft') anteriorImagen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCabina]);

  return (
    <div style={{ 
      backgroundColor: '#03030c', 
      minHeight: '100vh', 
      padding: '100px 20px 60px', 
      fontFamily: "'Segoe UI', system-ui, sans-serif", 
      color: '#fff',
      overflowX: 'hidden'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;800&display=swap');
        
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 20px rgba(255,0,127,0.3); } 50% { box-shadow: 0 0 40px rgba(255,0,127,0.6); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        
        .cabina-card {
          background: linear-gradient(145deg, #0a0a1a, #070714);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
        }
        .cabina-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-color, #ff007f), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cabina-card:hover::before { opacity: 1; }
        .cabina-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-color, #ff007f);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px var(--card-glow, rgba(255,0,127,0.1));
        }
        .cabina-card:hover .cabina-img {
          transform: scale(1.08);
          filter: saturate(1.2) contrast(1.1);
        }
        .cabina-img {
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          width: 100%; height: 100%; object-fit: cover;
        }
        .zoom-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(255,0,127,0.9);
          width: 60px; height: 60px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
        }
        .cabina-card:hover .zoom-icon {
          transform: translate(-50%, -50%) scale(1);
        }
        
        .filter-btn {
          padding: 10px 20px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #ff007f, #bd00ff);
          border-color: #ff007f;
          color: #fff;
          box-shadow: 0 0 20px rgba(255,0,127,0.4);
        }
        .filter-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        
        .modal-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(3,3,12,0.95);
          backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .modal-overlay.visible { opacity: 1; }
        .modal-content {
          background: linear-gradient(145deg, #0a0a1a, #070714);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          max-width: 1100px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          transform: scale(0.9) translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .modal-overlay.visible .modal-content {
          transform: scale(1) translateY(0);
        }
        
        .spec-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.8rem; color: #aaa;
        }
        
        .feature-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 0; color: #ccc; font-size: 0.9rem;
        }
        
        .envio-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px; border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        @media (max-width: 768px) {
          .modal-grid { grid-template-columns: 1fr !important; }
          .cabina-grid { grid-template-columns: 1fr !important; }
          .filter-scroll { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 10px; }
        }
      `}</style>

      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* HERO CABECERA */}
        <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 0.8s ease' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255, 0, 127, 0.1)', border: '1px solid rgba(255, 0, 127, 0.3)',
            padding: '8px 20px', borderRadius: '50px', marginBottom: '25px',
            color: '#ff007f', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px'
          }}>
            <Sparkles size={14} /> CUSTOM WOODWORKING WORKSHOP
          </div>
          
          <h1 className="font-cyber" style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            margin: '0', 
            lineHeight: '1',
            background: 'linear-gradient(135deg, #fff 0%, #ff007f 50%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            COMPRA TU CABINA DE DJ
          </h1>
          
          <p style={{ 
            color: '#888', maxWidth: '600px', margin: '20px auto 0', 
            fontSize: '1.05rem', lineHeight: '1.7', fontWeight: 300 
          }}>
            Diseño y fabricación de mobiliario profesional para DJ. 
            Estructuras de madera premium con acabados de alta durabilidad y ensamble modular rápido.
          </p>
        </div>

        {/* BANNERS DE ENVÍO ACTUALIZADOS */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', marginBottom: '50px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(0,242,254,0.08), rgba(0,242,254,0.02))', 
            border: '1px solid rgba(0,242,254,0.2)', 
            padding: '25px', borderRadius: '20px', 
            display: 'flex', gap: '18px', alignItems: 'flex-start',
            transition: 'all 0.3s', cursor: 'default'
          }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,242,254,0.5)'}
             onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,242,254,0.2)'}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '14px',
              background: 'rgba(0,242,254,0.15)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={24} color="#00f2fe" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 6px', color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>Envíos CDMX</h3>
              <p style={{ margin: '0', color: '#888', fontSize: '0.9rem', lineHeight: '1.5' }}>
                <strong style={{ color: '#00f2fe' }}>¡Gratis</strong> a domicilio en 5km del Estadio Azteca.<br/>
                <strong style={{ color: '#00f2fe' }}>$200</strong> resto de la Ciudad de México.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,0,127,0.08), rgba(255,0,127,0.02))', 
            border: '1px solid rgba(255,0,127,0.2)', 
            padding: '25px', borderRadius: '20px', 
            display: 'flex', gap: '18px', alignItems: 'flex-start',
            transition: 'all 0.3s', cursor: 'default'
          }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,0,127,0.5)'}
             onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,0,127,0.2)'}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '14px',
              background: 'rgba(255,0,127,0.15)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Package size={24} color="#ff007f" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 6px', color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>Foráneo e Interior</h3>
              <p style={{ margin: '0', color: '#888', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Bodegas en <strong style={{ color: '#ff007f' }}>Querétaro</strong> y <strong style={{ color: '#ff007f' }}>Guadalajara</strong>.<br/>
                Envíos al interior de México: <strong style={{ color: '#ff007f' }}>Cotizar</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', gap: '15px',
          background: 'linear-gradient(145deg, #0a0a1a, #070714)', 
          padding: '20px 25px', borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffeb3b' }}>
            <SlidersHorizontal size={18} />
            <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Filtrar por Acabado
            </span>
          </div>
          <div className="filter-scroll" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {coloresDisponibles.map((color) => (
              <button
                key={color}
                onClick={() => setFilterColor(color)}
                className={`filter-btn ${filterColor === color ? 'active' : ''}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE CABINAS */}
        <div className="cabina-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '30px' 
        }}>
          {cabinasFiltradas.map((cabina, index) => {
            const colorMap = {
              'Negro': { color: '#ff007f', glow: 'rgba(255,0,127,0.15)' },
              'Blanco': { color: '#00f2fe', glow: 'rgba(0,242,254,0.15)' },
              'Oro/Espejo': { color: '#ffeb3b', glow: 'rgba(255,235,59,0.15)' },
              'Plata/Espejo': { color: '#aaa', glow: 'rgba(170,170,170,0.15)' }
            };
            const theme = colorMap[cabina.color] || colorMap['Negro'];
            
            return (
              <div 
                key={cabina.id}
                className="cabina-card"
                style={{ 
                  '--card-color': theme.color,
                  '--card-glow': theme.glow,
                  animation: `slideUp 0.6s ease ${index * 0.1}s both`
                }}
                onClick={() => abrirModal(cabina)}
              >
                {/* Imagen */}
                <div style={{ 
                  height: '280px', 
                  position: 'relative', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#03030d'
                }}>
                  <img 
                    src={cabina.imagenes[0]} 
                    alt={cabina.nombre}
                    className="cabina-img"
                  />
                  
                  {/* Overlay gradiente */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(3,3,12,0.8) 0%, transparent 40%)',
                    pointerEvents: 'none'
                  }} />
                  
                  {/* Tag */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: theme.color,
                    color: '#03030c',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: `0 4px 15px ${theme.glow}`
                  }}>
                    {cabina.tag}
                  </div>
                  
                  {/* Badge a medida */}
                  {cabina.aMedida && (
                    <div style={{
                      position: 'absolute', top: '16px', right: '16px',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      color: '#fff',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Wrench size={12} /> A MEDIDA
                    </div>
                  )}
                  
                  {/* Color badge */}
                  <div style={{
                    position: 'absolute', bottom: '16px', right: '16px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {cabina.color}
                  </div>
                  
                  {/* Zoom icon */}
                  <div className="zoom-icon">
                    <ZoomIn size={28} color="#fff" />
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '25px' }}>
                  <h2 className="font-cyber" style={{ 
                    fontSize: '1.6rem', 
                    margin: '0 0 10px', 
                    color: '#fff',
                    lineHeight: '1.1'
                  }}>
                    {cabina.nombre}
                  </h2>
                  
                  <p style={{ 
                    color: '#888', 
                    fontSize: '0.9rem', 
                    lineHeight: '1.6', 
                    margin: '0 0 20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {cabina.descripcion}
                  </p>

                  {/* Specs mini */}
                  <div style={{ 
                    display: 'flex', gap: '8px', 
                    flexWrap: 'wrap', marginBottom: '20px' 
                  }}>
                    <span className="spec-badge">
                      <Ruler size={12} /> {cabina.specs.medidas}
                    </span>
                    <span className="spec-badge">
                      <Clock size={12} /> {cabina.specs.ensamble}
                    </span>
                    {cabina.aMedida && (
                      <span className="spec-badge" style={{ borderColor: 'rgba(255,0,127,0.3)', color: '#ff007f' }}>
                        <Wrench size={12} /> Personalizable
                      </span>
                    )}
                  </div>

                  {/* Precio y CTA */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '18px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Desde
                      </div>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 800, 
                        color: '#ffeb3b',
                        lineHeight: '1'
                      }}>
                        ${cabina.precio}
                        <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: '4px' }}>MXN</span>
                      </div>
                    </div>
                    
                    <button style={{
                      background: 'transparent',
                      border: `1.5px solid ${theme.color}`,
                      color: theme.color,
                      padding: '10px 20px',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.background = theme.color;
                      e.currentTarget.style.color = '#03030c';
                      e.currentTarget.style.boxShadow = `0 0 20px ${theme.glow}`;
                    }} onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = theme.color;
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      Ver <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA MUEBLES A LA MEDIDA */}
        <div style={{ 
          marginTop: '50px',
          marginBottom: '50px',
          background: 'linear-gradient(135deg, rgba(255,0,127,0.08), rgba(189,0,255,0.04))',
          border: '1px solid rgba(255,0,127,0.25)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '30px',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,0,127,0.15), transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#ff007f' }}>
              <Wrench size={22} />
              <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Servicio Especial</span>
            </div>
            <h3 className="font-cyber" style={{ fontSize: '2rem', margin: '0 0 10px', color: '#fff' }}>
              ¿NECESITAS MEDIDAS ESPECIALES?
            </h3>
            <p style={{ color: '#888', margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>
              Fabricamos muebles a la medida exacta de tu equipo y espacio. 
              Desde cabinas compactas hasta setups profesionales de gran formato.
            </p>
          </div>
          
          <button 
            onClick={() => window.location.href = 'https://wa.me/525567880698?text=Hola,%20me%20interesa%20solicitar%20una%20cotización%20para%20muebles%20a%20la%20medida.'}
            style={{
              background: 'linear-gradient(135deg, #ff007f, #bd00ff)',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 30px rgba(255,0,127,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,0,127,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,0,127,0.4)';
            }}
          >
            Solicitar Cotización
          </button>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center',
          padding: '30px',
          borderRadius: '20px',
          background: 'linear-gradient(145deg, rgba(0,242,254,0.03), rgba(255,0,127,0.03))',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            <ShieldCheck size={20} color="#25d366" />
            <span style={{ color: '#25d366', fontWeight: 700, fontSize: '0.95rem' }}>
              Compras protegidas por Amazon México
            </span>
          </div>
          <p style={{ color: '#555', fontSize: '0.85rem', margin: 0 }}>
            Transacciones seguras • Envío A-to-Z • Garantía de satisfacción
          </p>
        </div>

      </div>

      {/* MODAL / LIGHTBOX */}
      {selectedCabina && (
        <div 
          className={`modal-overlay ${isVisible ? 'visible' : ''}`}
          onClick={cerrarModal}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
            style={{ overflow: 'hidden' }}
          >
            {/* Botón cerrar */}
            <button
              onClick={cerrarModal}
              style={{
                position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#ff007f';
                e.currentTarget.style.borderColor = '#ff007f';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={20} />
            </button>

            <div className="modal-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.1fr 0.9fr',
              minHeight: '500px'
            }}>
              {/* Lado izquierdo: Galería de imágenes */}
              <div style={{ 
                position: 'relative', 
                background: '#03030d',
                minHeight: '400px'
              }}>
                <img 
                  src={selectedCabina.imagenes[currentImageIndex]} 
                  alt={selectedCabina.nombre}
                  style={{ 
                    width: '100%', height: '100%', 
                    objectFit: 'cover', display: 'block'
                  }}
                />
                
                {/* Overlay gradiente sutil */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, transparent 80%, rgba(3,3,12,0.5))',
                  pointerEvents: 'none'
                }} />

                {/* Navegación de imágenes */}
                {selectedCabina.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={anteriorImagen}
                      style={{
                        position: 'absolute', left: '15px', top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)', transition: 'all 0.3s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,0,127,0.8)';
                        e.currentTarget.style.borderColor = '#ff007f';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={siguienteImagen}
                      style={{
                        position: 'absolute', right: '15px', top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)', transition: 'all 0.3s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,0,127,0.8)';
                        e.currentTarget.style.borderColor = '#ff007f';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Indicadores de imagen */}
                {selectedCabina.imagenes.length > 1 && (
                  <div style={{
                    position: 'absolute', bottom: '20px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', gap: '8px'
                  }}>
                    {selectedCabina.imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          border: 'none', cursor: 'pointer',
                          background: idx === currentImageIndex ? '#ff007f' : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.3s',
                          boxShadow: idx === currentImageIndex ? '0 0 10px #ff007f' : 'none'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Tag flotante */}
                <div style={{
                  position: 'absolute', top: '20px', left: '20px',
                  background: '#ff007f', color: '#fff',
                  padding: '6px 14px', borderRadius: '20px',
                  fontSize: '0.75rem', fontWeight: 800,
                  letterSpacing: '1px', textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(255,0,127,0.4)'
                }}>
                  {selectedCabina.tag}
                </div>
              </div>

              {/* Lado derecho: Info detallada */}
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ marginBottom: '25px' }}>
                  <h2 className="font-cyber" style={{ 
                    fontSize: '2.2rem', margin: '0 0 12px', 
                    color: '#fff', lineHeight: '1.1'
                  }}>
                    {selectedCabina.nombre}
                  </h2>
                  <p style={{ 
                    color: '#888', fontSize: '1rem', 
                    lineHeight: '1.7', margin: 0 
                  }}>
                    {selectedCabina.descripcion}
                  </p>
                </div>

                {/* Specs */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '10px', 
                  marginBottom: '25px' 
                }}>
                  {Object.entries(selectedCabina.specs).map(([key, val]) => (
                    <div key={key} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      padding: '12px 16px', borderRadius: '12px'
                    }}>
                      <div style={{ 
                        fontSize: '0.7rem', color: '#666', 
                        textTransform: 'uppercase', letterSpacing: '1px',
                        marginBottom: '4px'
                      }}>
                        {key === 'medidas' ? 'Medidas (LxPxA)' : key}
                      </div>
                      <div style={{ 
                        fontSize: '0.95rem', color: '#fff', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {key === 'medidas' && <Ruler size={14} color="#00f2fe" />}
                        {key === 'peso' && <Package size={14} color="#00f2fe" />}
                        {key === 'ensamble' && <Clock size={14} color="#00f2fe" />}
                        {key === 'garantia' && <ShieldCheck size={14} color="#00f2fe" />}
                        {key === 'material' && <Sparkles size={14} color="#00f2fe" />}
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ 
                    fontSize: '0.85rem', color: '#ff007f', 
                    margin: '0 0 12px', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 800
                  }}>
                    Características
                  </h3>
                  {selectedCabina.features.map((feat, idx) => (
                    <div key={idx} className="feature-item">
                      <CheckCircle2 size={16} color="#00f2fe" />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Envío y Entrega */}
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ 
                    fontSize: '0.85rem', color: '#ffeb3b', 
                    margin: '0 0 12px', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 800
                  }}>
                    Envío y Entrega
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="envio-item">
                      <Truck size={16} color="#00f2fe" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Gratis</div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selectedCabina.envio.gratis}</div>
                      </div>
                    </div>
                    <div className="envio-item">
                      <MapPin size={16} color="#ff007f" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>CDMX</div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selectedCabina.envio.cdmx}</div>
                      </div>
                    </div>
                    <div className="envio-item">
                      <Package size={16} color="#ffeb3b" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Interior</div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selectedCabina.envio.interior}</div>
                      </div>
                    </div>
                    <div className="envio-item">
                      <MapPin size={16} color="#25d366" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Bodegas</div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selectedCabina.envio.bodegas.join(' / ')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mueble a medida */}
                {selectedCabina.aMedida && (
                  <div style={{
                    background: 'rgba(255,0,127,0.08)',
                    border: '1px solid rgba(255,0,127,0.25)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Wrench size={18} color="#ff007f" />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>Disponible a la medida</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>Podemos ajustar dimensiones según tu setup</div>
                    </div>
                  </div>
                )}

                {/* Precio y CTA */}
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '0.8rem', color: '#666', 
                        textTransform: 'uppercase', letterSpacing: '2px',
                        marginBottom: '4px'
                      }}>
                        Precio de fábrica
                      </div>
                      <div style={{ 
                        fontSize: '2.8rem', fontWeight: 800, 
                        color: '#ffeb3b', lineHeight: '1',
                        textShadow: '0 0 20px rgba(255,235,59,0.3)'
                      }}>
                        ${selectedCabina.precio}
                        <span style={{ fontSize: '1rem', color: '#888', marginLeft: '6px' }}>MXN</span>
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255,0,127,0.1)',
                      border: '1px solid rgba(255,0,127,0.3)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      color: '#ff007f',
                      fontWeight: 700
                    }}>
                      {selectedCabina.color}
                    </div>
                  </div>

                  <a 
                    href={selectedCabina.amazonLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #ff9900, #ff7700)',
                      border: 'none',
                      padding: '18px',
                      borderRadius: '16px',
                      color: '#000',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: '0 8px 30px rgba(255,153,0,0.3)'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,153,0,0.5)';
                    }} onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,153,0,0.3)';
                    }}>
                      <ExternalLink size={20} />
                      Ver en Amazon México
                    </button>
                  </a>

                  <p style={{ 
                    textAlign: 'center', 
                    margin: '12px 0 0', 
                    color: '#555', 
                    fontSize: '0.75rem' 
                  }}>
                    <ShieldCheck size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Compra protegida por Amazon A-to-Z
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}