import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Users, Calendar, DollarSign, Database, RefreshCw, AlertCircle, CheckCircle2, FileText, Send, Trash2, Edit3, Eye, LayoutGrid } from 'lucide-react';

export default function Admin() {
  // 🔐 CONTROL DE SESIÓN SEGURO: Inicializamos revisando si existe una sesión válida en el almacenamiento del navegador
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = sessionStorage.getItem('gd_admin_auth');
    const savedTime = sessionStorage.getItem('gd_admin_timestamp');
    
    if (savedAuth === 'true' && savedTime) {
      const tiempoTranscurrido = Date.now() - parseInt(savedTime, 10);
      const limiteCincoMinutos = 5 * 60 * 1000; // 300,000 ms
      
      if (tiempoTranscurrido < limiteCincoMinutos) {
        return true;
      } else {
        sessionStorage.clear(); // Limpieza si expiró mientras estaba fuera
      }
    }
    return false;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  // CONTROL DE PANEL Y SELECCIONES
  const [activeTab, setActiveTab] = useState('ventas'); 
  const [blogPosts, setBlogPosts] = useState([]);
  
  // FORMULARIO UNIFICADO DE PUBLICACIÓN Y EDICIÓN
  const [postIdEditing, setPostIdEditing] = useState(null); 
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  // 🕵️ MOTOR DETECTOR DE INACTIVIDAD AUTOMÁTICA EN SEGUNDO PLANO (5 MINUTOS)
  useEffect(() => {
    if (!isAuthenticated) return;

    // Función gatillo para refrescar el tiempo de vida de la sesión ante actividad del usuario
    const actualizarActividad = () => {
      sessionStorage.setItem('gd_admin_timestamp', Date.now().toString());
    };

    // Escuchadores de eventos corporativos de interfaz
    window.addEventListener('mousemove', actualizarActividad);
    window.addEventListener('click', actualizarActividad);
    window.addEventListener('keydown', actualizarActividad);
    window.addEventListener('scroll', actualizarActividad);

    // Verificador cíclico cada 10 segundos para evaluar abandono
    const intervaloVerificacion = setInterval(() => {
      const savedTime = sessionStorage.getItem('gd_admin_timestamp');
      if (savedTime) {
        const tiempoInactivo = Date.now() - parseInt(savedTime, 10);
        const limiteCincoMinutos = 5 * 60 * 1000;

        if (tiempoInactivo >= limiteCincoMinutos) {
          handleCerrarSesion();
          alert('Tu sesión ha expirado automáticamente por 5 minutos de inactividad para proteger los datos.');
        }
      }
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', actualizarActividad);
      window.removeEventListener('click', actualizarActividad);
      window.removeEventListener('keydown', actualizarActividad);
      window.removeEventListener('scroll', actualizarActividad);
      clearInterval(intervaloVerificacion);
    };
  }, [isAuthenticated]);

  // Descarga automatizada de colecciones al verificar persistencia de sesión
  useEffect(() => {
    if (isAuthenticated) {
      fetchVentas();
      fetchBlogPosts();
    }
  }, [isAuthenticated]);

  // 🔐 LOGIN SEGURO CONECTADO AL ENDPOINT DEL BACKEND (CREDENCIALES OCULTAS)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const resData = await response.json();

      if (resData.success) {
        // Inicializamos las banderas de persistencia en caché de sesión
        sessionStorage.setItem('gd_admin_auth', 'true');
        sessionStorage.setItem('gd_admin_timestamp', Date.now().toString());
        
        setIsAuthenticated(true);
        setEmail('');
        setPassword('');
      } else {
        alert(resData.error || 'Credenciales incorrectas de control interno.');
      }
    } catch (error) {
      alert('Error de comunicación con el servidor API de credenciales.');
    }
  };

  const handleCerrarSesion = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  const fetchVentas = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/ventas');
      const resData = await response.json();
      if (resData.success) setReservaciones(resData.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blog');
      const resData = await response.json();
      if (resData.success) setBlogPosts(resData.data.filter(p => !p.id.startsWith('base-')));
    } catch (error) { console.error(error); }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    const payload = { titulo, contenido, imagenUrl: imagenUrl || 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4' };
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      if (resData.success) {
        alert(postIdEditing ? "¡Publicación actualizada con éxito!" : "¡Nota indexada con éxito!");
        setTitulo('');
        setContenido('');
        setImagenUrl('');
        setPostIdEditing(null);
        fetchBlogPosts();
      }
    } catch (error) { alert("Error al sincronizar con el servidor API."); }
  };

  const startEditing = (post) => {
    setPostIdEditing(post.id);
    setTitulo(post.titulo);
    setContenido(post.contenido);
    setImagenUrl(post.imagenUrl);
    window.scrollTo(0, 200);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar permanentemente esta nota?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/blog/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) fetchBlogPosts();
    } catch (error) { console.error(error); }
  };

  const confirmados = reservaciones.filter(r => r.financiero?.estatus === 'Apartado Confirmado');
  const pendientes = reservaciones.filter(r => r.financiero?.estatus === 'Pendiente de Pago');
  const dineroRealCobrado = confirmados.length * 1500;

  if (!isAuthenticated) {
    return (
      <div style={{ backgroundColor: '#03030a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#07071c', border: '1px solid #1a1a3e', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Lock size={36} style={{ color: '#ff007f', marginBottom: '10px' }} />
            <h1 style={{ margin: 0, fontFamily: "'Bangers', cursive", fontSize: '2.5rem', letterSpacing: '2px', color: '#fff' }}>CONSOLA DE CONTROL</h1>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'sans-serif' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Usuario Master:</label>
              <input type="email" required placeholder="admin@gdl.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#03030d', border: '1px solid #1a1a3e', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Llave de Seguridad:</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#03030d', border: '1px solid #1a1a3e', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ background: '#ff007f', border: 'none', padding: '14px', borderRadius: '8px', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
              INGRESAR AL SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#03030a', minHeight: '100vh', padding: '100px 0 0 0', display: 'flex', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 🧭 SIDEBAR LATERAL IZQUIERDO DE COMANDOS FORMAL */}
      <aside style={{ width: '280px', background: '#07071c', borderRight: '1px solid #1a1a3e', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid #1a1a3e' }}>
          <ShieldCheck size={28} style={{ color: '#00f2fe' }} />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: "'Bangers', cursive", letterSpacing: '1px' }}>GD CONSOLE</div>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>v13.10 Stable</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('ventas')} style={{ width: '100%', padding: '14px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600', textAlign: 'left', background: activeTab === 'ventas' ? 'rgba(255, 0, 127, 0.15)' : 'transparent', color: activeTab === 'ventas' ? '#ff007f' : '#bbb' }}>
            <LayoutGrid size={18} /> Historial de Ventas
          </button>
          <button onClick={() => setActiveTab('blog')} style={{ width: '100%', padding: '14px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600', textAlign: 'left', background: activeTab === 'blog' ? 'rgba(0, 242, 254, 0.15)' : 'transparent', color: activeTab === 'blog' ? '#00f2fe' : '#bbb' }}>
            <FileText size={18} /> Gestor de Artículos
          </button>
          {/* BOTÓN OPERATIVO DE CIERRE MANUAL VOLUNTARIO */}
          <button onClick={handleCerrarSesion} style={{ width: '100%', padding: '14px 20px', borderRadius: '10px', border: '1px dashed #ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600', textAlign: 'left', background: 'transparent', color: '#ff4444', marginTop: '25px' }}>
            Cerrar Sesión Interna
          </button>
        </div>

        <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid #141430', fontSize: '0.8rem', color: '#666' }}>
          Consola Maestra Persistente <br/> Inactividad: 5 min Auto-Lock
        </div>
      </aside>

      {/* 🖥️ ÁREA CENTRAL DE TRABAJO */}
      <main style={{ flex: 1, padding: '40px 40px 60px 40px', overflowY: 'auto' }}>
        
        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1a1a3e', paddingBottom: '20px' }}>
          <h2 style={{ margin: 0, fontFamily: "'Bangers', cursive", fontSize: '3rem', letterSpacing: '1px' }}>
            {activeTab === 'ventas' ? 'AUDITORÍA DE LOGÍSTICA COMERCIAL' : 'SISTEMA DE EDICIÓN Y NOTAS'}
          </h2>
          <button onClick={() => { fetchVentas(); fetchBlogPosts(); }} style={{ background: '#07071c', border: '1px solid #1a1a3e', padding: '10px 20px', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <RefreshCw size={14} className={loading ? 'spin-anim' : ''} /> Sincronizar Nube
          </button>
        </div>

        {/* PESTAÑA VENTAS */}
        {activeTab === 'ventas' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: '#07071c', border: '1px solid #1a1a3e', padding: '25px', borderRadius: '16px' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>COTIZACIONES LEADS</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffeb3b' }}>{pendientes.length} Registros</span>
              </div>
              <div style={{ background: '#07071c', border: '1px solid #1a1a3e', padding: '25px', borderRadius: '16px' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>APARTADOS CONFIRMADOS</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#25d366' }}>{confirmados.length} Eventos</span>
              </div>
              <div style={{ background: '#07071c', border: '1px solid #1a1a3e', padding: '25px', borderRadius: '16px' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>EFECTIVO RECAUDADO</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00f2fe' }}>${dineroRealCobrado.toLocaleString()} MXN</span>
              </div>
            </div>

            <div style={{ background: '#07071c', border: '1px solid #1a1a3e', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#101030', borderBottom: '1px solid #1a1a3e', color: '#00f2fe' }}>
                      <th style={{ padding: '15px' }}>ESTATUS</th>
                      <th style={{ padding: '15px' }}>CLIENTE</th>
                      <th style={{ padding: '15px' }}>LOGÍSTICA</th>
                      <th style={{ padding: '15px' }}>FINANCIERO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservaciones.map((res) => {
                      const isPaid = res.financiero?.estatus === 'Apartado Confirmado';
                      return (
                        <tr key={res.id} style={{ borderBottom: '1px solid #141435', background: isPaid ? 'rgba(37,211,102,0.01)' : 'transparent' }}>
                          <td style={{ padding: '15px' }}>
                            <span style={{ display: 'inline-block', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', border: `1px solid ${isPaid ? '#25d366' : '#ffb300'}`, color: isPaid ? '#25d366' : '#ffb300' }}>
                              {isPaid ? 'CONFIRMADO' : 'SOLO COTIZÓ'}
                            </span>
                          </td>
                          <td style={{ padding: '15px' }}><strong>{res.cliente?.nombre}</strong><br/><span style={{color: '#666'}}>{res.cliente?.telefono}</span></td>
                          <td style={{ padding: '15px' }}>{res.logistica?.fecha} @ {res.logistica?.horaInicio}h<br/><span style={{color: '#888', fontSize: '0.8rem'}}>{res.logistica?.direccion}</span></td>
                          <td style={{ padding: '15px' }}><strong>Total: ${res.financiero?.totalEvent?.toLocaleString()}</strong><br/><span style={{color: '#888'}}>${isPaid ? 'Anticipo Pagado' : 'Sin Anticipo'}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PESTAÑA BLOG */}
        {activeTab === 'blog' && (
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1150 ? '1.2fr 1fr' : '1fr', gap: '30px', alignItems: 'start' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <form onSubmit={handleSavePost} style={{ background: '#07071c', padding: '30px', borderRadius: '16px', border: '1px solid #1a1a3e', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a3e', paddingBottom: '15px' }}>
                  <h3 style={{ margin: 0, fontFamily: "'Bangers', cursive", fontSize: '2rem', color: '#00f2fe', letterSpacing: '1px' }}>
                    {postIdEditing ? '📝 EDITANDO PUBLICACIÓN' : '🚀 REDACTAR NUEVO POST'}
                  </h3>
                  {postIdEditing && (
                    <button type="button" onClick={() => { setPostIdEditing(null); setTitulo(''); setContenido(''); setImagenUrl(''); }} style={{ background: '#ff4444', border: 'none', padding: '6px 12px', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#aaa', display: 'block', marginBottom: '6px' }}>Título del Artículo:</label>
                  <input type="text" required placeholder="Ej. Guía completa de iluminación Truss..." value={titulo} onChange={(e) => setTitulo(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #222', background: '#03030d', color: '#fff', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#aaa', display: 'block', marginBottom: '6px' }}>URL de Imagen de Portada:</label>
                  <input type="text" placeholder="https://images.unsplash.com/..." value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #222', background: '#03030d', color: '#fff', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#aaa', display: 'block', marginBottom: '6px' }}>Contenido de la Publicación:</label>
                  <textarea required rows="10" placeholder="Escribe los párrafos de tu artículo..." value={contenido} onChange={(e) => setContenido(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #222', background: '#03030d', color: '#fff', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6', fontFamily: 'sans-serif' }}></textarea>
                </div>

                <button type="submit" style={{ background: '#00f2fe', color: '#000', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} /> {postIdEditing ? 'GUARDAR CAMBIOS EDITADOS' : 'INDEXAR E INYECTAR EN LA WEB'}
                </button>
              </form>

              <div style={{ background: '#07071c', padding: '30px', borderRadius: '16px', border: '1px solid #1a1a3e' }}>
                <h3 style={{ margin: '0 0 20px 0', fontFamily: "'Bangers', cursive", fontSize: '2rem', color: '#ff007f', letterSpacing: '1px' }}>HISTORIAL DE PUBLICACIONES DE LA DB</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {blogPosts.map((post) => (
                    <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#03030d', padding: '15px', borderRadius: '10px', border: '1px solid #1a1a3e' }}>
                      <div style={{ maxWidth: '75%' }}>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>{post.titulo}</h4>
                        <span style={{ color: '#555', fontSize: '0.75rem' }}>📅 {new Date(post.fechaPublicacion).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEditing(post)} style={{ background: 'transparent', border: 'none', color: '#00f2fe', cursor: 'pointer' }} title="Editar Nota"><Edit3 size={16} /></button>
                        <button onClick={() => handleDeletePost(post.id)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }} title="Borrar Nota"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && <div style={{ color: '#444', textAlign: 'center', padding: '20px' }}>No hay artículos creados en Firestore.</div>}
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff007f', marginBottom: '15px', fontFamily: "'Bangers', cursive", fontSize: '1.4rem', letterSpacing: '0.5px' }}>
                <Eye size={18} /> PREVISUALIZACIÓN EN TIEMPO REAL
              </div>
              <div style={{ background: '#0b0b22', borderRadius: '24px', overflow: 'hidden', border: '2px dashed #00f2fe', padding: '20px' }}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '12px', background: '#03030d', border: '1px solid #1a1a3e' }}>
                  {imagenUrl && <img src={imagenUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '20px 10px' }}>
                  <div style={{ color: '#ff007f', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' }}>👤 GUSTAVO DELGADILLO | 📅 {new Date().toLocaleDateString()}</div>
                  <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 12px 0', fontFamily: "'Bangers', cursive", lineHeight: '1.2' }}>
                    {titulo || 'Escribe un título arriba para ver el render...'}
                  </h2>
                  <p style={{ color: '#aaa', fontSize: '0.88rem', lineHeight: '1.6', whiteSpace: 'pre-line', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {contenido || 'El cuerpo del texto se renderizará de forma estructurada en este bloque...'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}