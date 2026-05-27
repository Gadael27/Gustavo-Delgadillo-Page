import React, { useState, useEffect } from 'react';
import { Clock, User, ArrowLeft, Calendar, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // 🔌 CONEXIÓN LIMPIA A LA API: Trae únicamente las notas reales creadas en Firebase Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blog');
        const data = await res.json();
        if (data.success) {
          setPosts(data.data); // Asigna directamente los datos vivos de la DB
        }
      } catch (err) {
        console.error("Error al conectar con la API de contenidos de Firebase:", err);
      }
    };
    fetchPosts();
  }, []);

  // 📖 VISTA DETALLADA DEL ARTÍCULO (SINGLE POST CON SIDEBAR DE CONVERSIÓN)
  if (selectedPost) {
    return (
      <div style={{ backgroundColor: '#03030c', minHeight: '100vh', padding: '120px 20px 60px 20px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <button 
            onClick={() => { setSelectedPost(null); window.scrollTo(0,0); }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,242,254,0.3)', padding: '10px 20px', borderRadius: '30px', color: '#00f2fe', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '40px', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,242,254,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ArrowLeft size={16} /> VOLVER AL FEED
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 990 ? '2.2fr 1fr' : '1fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Contenido Central */}
            <article style={{ background: '#07071c', border: '1px solid #1a1a3e', borderRadius: '24px', overflow: 'hidden', padding: window.innerWidth > 768 ? '40px' : '20px' }}>
              <img src={selectedPost.imagenUrl} alt={selectedPost.titulo} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '30px', border: '1px solid #1a1a3e' }} />
              
              <div style={{ display: 'flex', gap: '20px', color: '#888', fontSize: '0.85rem', marginBottom: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} style={{ color: '#ff007f' }} /> {selectedPost.autor || 'Gustavo Delgadillo'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} style={{ color: '#00f2fe' }} /> {new Date(selectedPost.fechaPublicacion).toLocaleDateString()}</span>
              </div>

              <h1 style={{ fontSize: window.innerWidth > 768 ? '3rem' : '2rem', fontFamily: "'Bangers', cursive", color: '#fff', margin: '0 0 25px 0', letterSpacing: '1px', lineHeight: '1.1' }}>
                {selectedPost.titulo}
              </h1>

              <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'justify', fontWeight: '300' }}>
                {selectedPost.contenido}
              </p>
            </article>

            {/* BARRA LATERAL COMERCIAL DE CONVERSIÓN CONTEXTUAL */}
            <aside style={{ position: 'sticky', top: '100px', background: 'linear-gradient(135deg, #0b0b22 0%, #050515 100%)', border: '2px solid #ff007f', borderRadius: '24px', padding: '30px', boxShadow: '0 0 25px rgba(255,0,127,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff007f', marginBottom: '15px' }}>
                <Zap size={18} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>FECHAS LIMITADAS 2026</span>
              </div>
              <h3 style={{ margin: '0 0 15px 0', fontFamily: "'Bangers', cursive", fontSize: '2.2rem', color: '#fff', lineHeight: '1' }}>
                ¿QUIERES ESTA ENERGÍA EN TU EVENTO?
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '25px' }}>
                Los montajes de iluminación, audio lineal y cabinas premium que leíste en este artículo se agendan con anticipación. Asegura tu fecha hoy mismo con Gustavo.
              </p>
              
              <button 
                onClick={() => window.location.href = '/cotizacion'}
                style={{ width: '100%', background: '#ff007f', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1.3rem', fontFamily: "'Bangers', cursive", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 15px rgba(255,0,127,0.4)', marginBottom: '15px', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Calendar size={18} /> RESERVAR AHORA
              </button>

              <button 
                onClick={() => window.location.href = 'https://wa.me/525567880698'}
                style={{ width: '100%', background: 'transparent', color: '#25d366', border: '1px solid #25d366', padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37,211,102,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <MessageSquare size={16} /> CONSULTAR POR WHATSAPP
              </button>
            </aside>

          </div>
        </div>
      </div>
    );
  }

  // 🎴 FEED PRINCIPAL CON MATRIZ ASIMÉTRICA DINÁMICA (CSS GRID CON MOD 3)
  return (
    <div style={{ backgroundColor: '#03030c', minHeight: '100vh', padding: '120px 20px 60px 20px', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#00f2fe', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>GD CHRONICLES & TIPS</span>
          <h1 style={{ fontSize: window.innerWidth > 768 ? '5rem' : '3rem', margin: '10px 0', fontFamily: "'Bangers', cursive", textShadow: '2px 2px #ff007f', letterSpacing: '1px', lineHeight: '1' }}>
            EL BLOG DE GD PRODUCCIONES
          </h1>
          <p style={{ color: '#aaa', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '300' }}>
            Historias reales de pistas llenas, guías exclusivas de rigging y consejos técnicos para que tu evento sea inolvidable.
          </p>
        </div>

        {/* Rejilla estructural de 3 columnas para permitir la asimetría de mosaicos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr', 
          gap: '40px' 
        }}>
          {posts.map((post, index) => {
            // Evaluamos la posición para definir qué tarjetas toman 2 columnas (Grandes) y cuáles toman 1 (Pequeñas)
            const isLarge = window.innerWidth > 768 && (index % 3 === 0);

            return (
              <div 
                key={post.id} 
                onClick={() => { setSelectedPost(post); window.scrollTo(0,0); }}
                style={{ 
                  background: '#07071c', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid #1a1a3e', 
                  display: 'flex', 
                  flexDirection: isLarge ? 'row' : 'column', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s',
                  gridColumn: isLarge ? 'span 2' : 'span 1', // Control del tamaño de la cuadrícula
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#ff007f'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1a1a3e'; }}
              >
                <div style={{ display: 'flex', flexDirection: isLarge ? 'row' : 'column', width: '100%' }}>
                  
                  {/* Imagen de Portada Variable */}
                  <div style={{ 
                    width: isLarge ? '45%' : '100%', 
                    height: isLarge ? '100%' : '240px', 
                    minHeight: isLarge ? '320px' : '240px',
                    overflow: 'hidden', 
                    borderBottom: isLarge ? 'none' : '1px solid #1a1a3e',
                    borderRight: isLarge ? '1px solid #1a1a3e' : 'none'
                  }}>
                    <img src={post.imagenUrl} alt={post.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Cuerpo Informativo */}
                  <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyC: 'space-between', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '0.8rem', marginBottom: '15px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={12} /> {post.autor || 'Gustavo Delgadillo'}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={12} /> {new Date(post.fechaPublicacion).toLocaleDateString()}</span>
                      </div>
                      <h2 style={{ fontSize: isLarge ? '1.8rem' : '1.4rem', color: '#fff', margin: '0 0 15px 0', fontFamily: "'Bangers', cursive", letterSpacing: '0.5px', lineHeight: '1.2' }}>
                        {post.titulo}
                      </h2>
                      <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: isLarge ? 5 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.contenido}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid #141435', marginTop: '20px', paddingTop: '15px' }}>
                      <span style={{ color: '#00f2fe', fontSize: '0.88rem', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        LEER ARTÍCULO COMPLETO <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje de respaldo por si borras todas las notas en Firestore */}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', color: '#444', padding: '60px', border: '1px dashed #1a1a3e', borderRadius: '12px' }}>
            Aún no hay publicaciones guardadas en el feed de Firebase. ¡Sube la primera desde el Panel Administrativo!
          </div>
        )}

      </div>
    </div>
  );
}