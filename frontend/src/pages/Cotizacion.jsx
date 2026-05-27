import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CreditCard, Clock, CheckCircle, AlertTriangle, 
  MapPin, User, Phone, Mail, Calendar, Users, Home, 
  Package, Sparkles, ChevronDown, Info, MessageSquare
} from 'lucide-react';

// ✅ CORRECCIÓN 1: El componente InputField SE MUEVE AFUERA para que React no pierda el foco al escribir
const InputField = ({ icon: Icon, label, name, type = "text", placeholder, value, error, touched, onChange, onBlur, children, ...props }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ 
      color: '#ccc', fontSize: '0.85rem', display: 'flex', alignItems: 'center',
      gap: '6px', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '1px'
    }}>
      <Icon size={14} color={error && touched ? '#ff4444' : '#00f2fe'} />
      {label} <span style={{ color: '#ff007f' }}>*</span>
    </label>
    {children || (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          width: '100%', padding: '14px 16px', borderRadius: '12px',
          border: error && touched ? '2px solid #ff4444' : '1px solid #2a2a4e',
          background: '#0a0a1a', color: '#fff', fontSize: '1rem',
          outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box',
          boxShadow: error && touched ? '0 0 10px rgba(255,68,68,0.2)' : 'none'
        }}
        onFocus={e => {
          if (!error) e.target.style.borderColor = '#00f2fe';
          e.target.style.boxShadow = '0 0 15px rgba(0,242,254,0.1)';
        }}
        onBlurCapture={e => {
          e.target.style.borderColor = error && touched ? '#ff4444' : '#2a2a4e';
          e.target.style.boxShadow = 'none';
        }}
        {...props}
      />
    )}
    {error && touched && (
      <div style={{ 
        color: '#ff4444', fontSize: '0.8rem', marginTop: '6px',
        display: 'flex', alignItems: 'center', gap: '4px'
      }}>
        <AlertTriangle size={12} /> {error}
      </div>
    )}
  </div>
);

export default function Cotizacion() {
  const todayDateStr = new Date().toISOString().split('T')[0];
  
  // ESTADOS DEL FORMULARIO SANITIZADOS
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    fecha: todayDateStr,
    horaInicio: '14:00',
    tipoEvento: 'Boda',
    locacion: 'Interior',
    direccion: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ESTADOS DE CONTROL DE NEGOCIO
  const [packageType, setPackageType] = useState('Base');
  const [extraHours, setExtraHours] = useState(0); 
  const [peopleRange, setPeopleRange] = useState('10-100');
  const [paymentType, setPaymentType] = useState('anticipo'); // 'anticipo' o 'completo'
  const [mpLoaded, setMpLoaded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isTimeSlotBlocked, setIsTimeSlotBlocked] = useState(false);

  // AUTOCOMPLETADO LOCAL CDMX
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // CAPTURADOR DE PARÁMETROS URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paqueteElegido = params.get('paquete');
    if (paqueteElegido === 'Base' || paqueteElegido === 'Premium') {
      setPackageType(paqueteElegido);
    }
  }, []);

  // BASE DE DIRECCIONES CDMX
  const baseDireccionesCDMX = [
    'Estadio Azteca, Calz. de Tlalpan, Coyoacán, CDMX',
    'Jardines del Pedregal, Álvaro Obregón, CDMX',
    'Polanco, Miguel Hidalgo, CDMX',
    'Paseo de la Reforma, Cuauhtémoc, CDMX',
    'Centro Histórico, Cuauhtémoc, CDMX',
    'Coyoacán Centro, Del Carmen, Coyoacán, CDMX',
    'Condesa, Cuauhtémoc, CDMX',
    'Roma Norte, Cuauhtémoc, CDMX',
    'Santa Fe, Cuajimalpa de Morelos, CDMX',
    'Tlalpan Centro, Tlalpan, CDMX',
    'San Ángel, Álvaro Obregón, CDMX',
    'Del Valle, Benito Juárez, CDMX',
    'Narvarte Oriente, Benito Juárez, CDMX',
    'Satélite, Naucalpan de Juárez, CDMX'
  ];

  // MOCK CALENDAR
  const mockGoogleCalendarEvents = [
    { fecha: '2026-06-15', horaInicio: '13:00', horasTotales: 5 }, 
    { fecha: '2026-06-20', horaInicio: '20:00', horasTotales: 7 }  
  ];

  // DETECTOR DE COLISIONES
  useEffect(() => {
    const checkCollision = () => {
      const selectedDate = formData.fecha;
      const [selHour, selMin] = formData.horaInicio.split(':').map(Number);
      const startMinutes = selHour * 60 + selMin;
      const totalDurationMinutes = (5 + extraHours) * 60;
      const endMinutes = startMinutes + totalDurationMinutes;

      const sameDayEvents = mockGoogleCalendarEvents.filter(e => e.fecha === selectedDate);
      let isBlocked = false;

      for (let event of sameDayEvents) {
        const [evHour, evMin] = event.horaInicio.split(':').map(Number);
        const evStartMinutes = evHour * 60 + evMin;
        const evEndMinutesWithTransit = evStartMinutes + (event.horasTotales * 60) + 180;

        if (
          (startMinutes >= evStartMinutes && startMinutes < evEndMinutesWithTransit) ||
          (endMinutes > evStartMinutes && endMinutes <= evEndMinutesWithTransit) ||
          (startMinutes <= evStartMinutes && endMinutes >= evEndMinutesWithTransit)
        ) {
          isBlocked = true;
          break;
        }
      }
      setIsTimeSlotBlocked(isBlocked);
    };
    checkCollision();
  }, [formData.fecha, formData.horaInicio, extraHours]);

  // SDK MERCADO PAGO
  useEffect(() => {
    const mpScript = document.createElement('script');
    mpScript.src = 'https://sdk.mercadopago.com/js/v2';
    mpScript.async = true;
    mpScript.onload = () => setMpLoaded(true);
    document.body.appendChild(mpScript);
    return () => { document.body.removeChild(mpScript); };
  }, []);

  // ============ VALIDACIONES SANITIZADAS ============

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        if (!value.trim()) return 'Este campo es obligatorio';
        if (value.trim().length < 2) return 'Mínimo 2 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'Solo letras y espacios';
        return '';
      case 'telefono':
        if (!value) return 'Teléfono obligatorio';
        if (!/^\d{10}$/.test(value)) return 'Debe ser exactamente 10 dígitos';
        return '';
      case 'correo':
        if (!value) return 'Correo obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido';
        return '';
      case 'direccion':
        if (!value.trim()) return 'Dirección obligatoria';
        if (value.trim().length < 10) return 'Dirección muy corta';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const isFormValid = () => {
    const newErrors = {};
    ['nombre', 'apellido', 'telefono', 'correo', 'direccion'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({ nombre: true, apellido: true, telefono: true, correo: true, direccion: true });
    return Object.keys(newErrors).length === 0 && !isTimeSlotBlocked;
  };

  // TELÉFONO: solo números, máximo 10
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleChange('telefono', val);
  };

  // DIRECCIÓN AUTOCOMPLETADO
  const handleDireccionChange = (e) => {
    const value = e.target.value;
    handleChange('direccion', value);
    if (value.length > 2) {
      const filtered = baseDireccionesCDMX.filter(d => 
        d.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (item) => {
    setFormData(prev => ({ ...prev, direccion: item }));
    setShowSuggestions(false);
    setErrors(prev => ({ ...prev, direccion: '' }));
  };

  // CÁLCULO DE COTIZACIÓN (✅ CORRECCIÓN 3: Eliminado el descuento)
  const calculateTotal = () => {
    let serviceBasePrice = packageType === 'Base' ? 5500 : 7500;
    const extraHoursCost = extraHours * 1200;

    let peopleAdditionalCost = 0;
    if (peopleRange === '100-200') peopleAdditionalCost = 3000;
    else if (peopleRange === '200-300') peopleAdditionalCost = 5500;
    else if (peopleRange === '300+') peopleAdditionalCost = 7500;

    const totalEvent = serviceBasePrice + extraHoursCost + peopleAdditionalCost;
    const anticipo = 1500;
    const saldoPendiente = totalEvent - anticipo;
    // Ahora el pago completo es simplemente el total íntegro (sin * 0.9)
    const montoPagar = paymentType === 'completo' ? totalEvent : anticipo;

    return { totalEvent, extraHoursCost, peopleAdditionalCost, anticipo, saldoPendiente, montoPagar };
  };

  const { totalEvent, extraHoursCost, peopleAdditionalCost, anticipo, saldoPendiente, montoPagar } = calculateTotal();

  const handleSubmitContract = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reservaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalEvent,
          paymentType,
          montoPagar
        })
      });

      const data = await response.json();

      if (data.success && data.init_point) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = data.init_point;
        }, 2200);
      } else {
        alert('Error al procesar la reserva con el servidor.');
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert('No se pudo conectar con el servidor de base de datos.');
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0a0a1a 0%, #121230 50%, #0d0d2a 100%)', 
      minHeight: '100vh', 
      padding: '100px 20px 60px', 
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", 
      color: '#fff'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;700;800&display=swap');
        
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(255,0,127,0.3); } 50% { box-shadow: 0 0 40px rgba(255,0,127,0.5); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        
        .section-card {
          background: linear-gradient(145deg, rgba(10,10,26,0.9), rgba(7,7,20,0.95));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          padding: 35px;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.6s ease both;
        }
        
        .option-card {
          padding: 16px 20px;
          border-radius: 16px;
          border: 2px solid transparent;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .option-card:hover { background: rgba(255,255,255,0.06); }
        .option-card.selected {
          border-color: var(--sel-color);
          background: var(--sel-bg);
          box-shadow: 0 0 25px var(--sel-glow);
        }
        
        .payment-option {
          padding: 20px;
          border-radius: 16px;
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .payment-option:hover { border-color: rgba(255,255,255,0.2); }
        .payment-option.selected {
          border-color: #ff007f;
          background: rgba(255,0,127,0.08);
          box-shadow: 0 0 30px rgba(255,0,127,0.15);
        }
        
        .suggestion-box {
          position: absolute; top: 100%; left: 0; width: 100%;
          background: #0f0f24; border: 1px solid #2a2a4e;
          borderRadius: 12px; zIndex: 100; marginTop: 8px;
          maxHeight: 200px; overflowY: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .suggestion-item {
          padding: 12px 16px; color: #ccc; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          fontSize: 0.9rem; transition: all 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .suggestion-item:hover { background: #1a1a3e; color: #fff; }
        
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .summary-sticky { position: relative !important; top: 0 !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '50px', animation: 'fadeInUp 0.6s ease' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)',
            padding: '8px 20px', borderRadius: '50px', marginBottom: '20px',
            color: '#00f2fe', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px'
          }}>
            <Sparkles size={14} /> RESERVA TU FECHA AHORA
          </div>
          
          <h1 className="font-cyber" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            margin: '0', lineHeight: '1.1',
            background: 'linear-gradient(135deg, #fff 0%, #00f2fe 50%, #ff007f 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SISTEMA DE RESERVAS
          </h1>
          <p style={{ color: '#888', maxWidth: '500px', margin: '15px auto 0', fontSize: '1rem', lineHeight: '1.6' }}>
            Completa tu información y aparta tu fecha. 
            El pago se procesa de forma segura vía Mercado Pago.
          </p>
        </div>

        <form onSubmit={handleSubmitContract} style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '30px' }} className="form-grid">
          
          {/* ========== COLUMNA IZQUIERDA: FORMULARIO ========== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

            {/* SECCIÓN 1: DATOS PERSONALES */}
            <div className="section-card" style={{ animationDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ff007f, #bd00ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={20} color="#fff" />
                </div>
                <div>
                  <h2 className="font-cyber" style={{ fontSize: '1.6rem', margin: 0, color: '#fff' }}>TUS DATOS</h2>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: '4px 0 0' }}>Información de contacto obligatoria</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <InputField
                  icon={User} label="Nombre" name="nombre"
                  placeholder="Ej. Juan"
                  value={formData.nombre}
                  error={errors.nombre} touched={touched.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  onBlur={() => handleBlur('nombre')}
                />
                <InputField
                  icon={User} label="Apellido" name="apellido"
                  placeholder="Ej. Pérez"
                  value={formData.apellido}
                  error={errors.apellido} touched={touched.apellido}
                  onChange={e => handleChange('apellido', e.target.value)}
                  onBlur={() => handleBlur('apellido')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <InputField
                  icon={Phone} label="Teléfono" name="telefono" type="tel"
                  placeholder="5512345678 (10 dígitos)"
                  value={formData.telefono}
                  error={errors.telefono} touched={touched.telefono}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur('telefono')}
                />
                <InputField
                  icon={Mail} label="Correo" name="correo" type="email"
                  placeholder="juan@correo.com"
                  value={formData.correo}
                  error={errors.correo} touched={touched.correo}
                  onChange={e => handleChange('correo', e.target.value)}
                  onBlur={() => handleBlur('correo')}
                />
              </div>
            </div>

            {/* SECCIÓN 2: AGENDA */}
            <div className="section-card" style={{ animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00f2fe, #0066ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Calendar size={20} color="#fff" />
                </div>
                <div>
                  <h2 className="font-cyber" style={{ fontSize: '1.6rem', margin: 0, color: '#fff' }}>AGENDA TU EVENTO - Solo CDMX</h2>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: '4px 0 0' }}>Selecciona fecha y horario disponible</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <InputField
                  icon={Calendar} label="Fecha del Evento" name="fecha" type="date"
                  value={formData.fecha}
                  error={errors.fecha} touched={touched.fecha}
                  onChange={e => handleChange('fecha', e.target.value)}
                  min={todayDateStr}
                />
                <InputField
                  icon={Clock} label="Hora de Inicio" name="horaInicio" type="time"
                  value={formData.horaInicio}
                  onChange={e => handleChange('horaInicio', e.target.value)}
                />
              </div>

              {/* ALERTA DE COLISIÓN */}
              {isTimeSlotBlocked && (
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(255,0,0,0.1), rgba(255,0,0,0.05))', 
                  border: '2px solid #ff4444', 
                  padding: '16px', borderRadius: '14px', 
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  marginTop: '10px', animation: 'fadeInUp 0.3s ease'
                }}>
                  <AlertTriangle size={22} color="#ff4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ color: '#ff6666', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                      Horario no disponible
                    </div>
                    <div style={{ color: '#ff8888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      Este horario interfiere con otro evento agendado o con el tiempo de traslado (+3 hrs). 
                      Por favor selecciona otro horario.
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <InputField
                  icon={Sparkles} label="Tipo de Evento" name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={e => handleChange('tipoEvento', e.target.value)}
                >
                  <select
                    value={formData.tipoEvento}
                    onChange={e => handleChange('tipoEvento', e.target.value)}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '1px solid #2a2a4e', background: '#0a0a1a', color: '#fff',
                      fontSize: '1rem', outline: 'none', cursor: 'pointer',
                      appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                      backgroundSize: '18px'
                    }}
                  >
                    <option value="Boda">Boda de Gala</option>
                    <option value="XV Años">XV Años</option>
                    <option value="Corporativo">Evento Corporativo</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Otro">Otro</option>
                  </select>
                </InputField>

                <InputField
                  icon={Home} label="Entorno" name="locacion"
                  value={formData.locacion}
                  onChange={e => handleChange('locacion', e.target.value)}
                >
                  <select
                    value={formData.locacion}
                    onChange={e => handleChange('locacion', e.target.value)}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '1px solid #2a2a4e', background: '#0a0a1a', color: '#fff',
                      fontSize: '1rem', outline: 'none', cursor: 'pointer',
                      appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                      backgroundSize: '18px'
                    }}
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Jardín">Jardín</option>
                    <option value="Salón">Salón de Eventos</option>
                  </select>
                </InputField>
              </div>

              {/* DIRECCIÓN CON AUTOCOMPLETADO */}
              <div style={{ marginTop: '16px', position: 'relative' }}>
                <InputField
                  icon={MapPin} label="Dirección Completa" name="direccion"
                  placeholder="Escribe la calle, colonia o alcaldía..."
                  value={formData.direccion}
                  error={errors.direccion} touched={touched.direccion}
                  onChange={handleDireccionChange}
                  onBlur={() => { handleBlur('direccion'); setTimeout(() => setShowSuggestions(false), 200); }}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="suggestion-box">
                    {suggestions.map((item, index) => (
                      <div 
                        key={index}
                        className="suggestion-item"
                        onClick={() => selectSuggestion(item)}
                      >
                        <MapPin size={14} color="#00f2fe" /> {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN: COTIZACIÓN PARA OTRO ESTADO */}
            <div className="section-card" style={{ animationDelay: '0.35s', background: 'linear-gradient(145deg, rgba(10,26,10,0.9), rgba(7,20,7,0.95))', border: '1px solid rgba(37,211,102,0.2)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #25d366, #00ff88)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MessageSquare size={16} color="#fff" />
                </div>
                <div>
                  <h2 className="font-cyber" style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>FUERA DE CDMX</h2>
                  <p style={{ color: '#666', fontSize: '0.7rem', margin: '2px 0 0' }}>¿Eres de otro estado?</p>
                </div>
              </div>

              <div style={{ 
                background: 'linear-gradient(135deg, rgba(37,211,102,0.1), rgba(0,255,136,0.05))',
                border: '1px solid rgba(37,211,102,0.3)',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '0',
                textAlign: 'center'
              }}>
                <p style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 10px' }}>
                  Realiza tu cotización aquí. Enviaremos disponibilidad, precios y opciones de transporte.
                </p>
                <button
                  onClick={() => window.location.href = 'https://wa.me/525567880698?text=Hola,%20me%20interesa%20una%20cotización%20de%20DJ%20para%20un%20evento%20fuera%20de%20la%20CDMX.'}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #25d366, #00ff88)',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,211,102,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.3)';
                  }}
                >
                  <MessageSquare size={16} />
                  Cotizar por WhatsApp
                </button>
              </div>
            </div>

            {/* SECCIÓN 3: CONFIGURACIÓN DEL PAQUETE */}
            <div className="section-card" style={{ animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ff007f, #ff5e00)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Package size={20} color="#fff" />
                </div>
                <div>
                  <h2 className="font-cyber" style={{ fontSize: '1.6rem', margin: 0, color: '#fff' }}>CONFIGURA TU PAQUETE</h2>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: '4px 0 0' }}>Personaliza tu experiencia</p>
                </div>
              </div>

              {/* Tipo de Paquete */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  color: '#ccc', fontSize: '0.85rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1px',
                  display: 'block', marginBottom: '12px'
                }}>
                  Selecciona tu Paquete
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div 
                    className={`option-card ${packageType === 'Base' ? 'selected' : ''}`}
                    style={{ 
                      '--sel-color': '#00f2fe', 
                      '--sel-bg': 'rgba(0,242,254,0.08)',
                      '--sel-glow': 'rgba(0,242,254,0.2)'
                    }}
                    onClick={() => setPackageType('Base')}
                  >
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#00f2fe', marginBottom: '4px' }}>
                      BASE
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
                      $5,500 <span style={{ fontSize: '0.85rem', color: '#888' }}>MXN</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>
                      5 hrs • Audio lineal • Cabina iluminada
                    </div>
                  </div>

                  <div 
                    className={`option-card ${packageType === 'Premium' ? 'selected' : ''}`}
                    style={{ 
                      '--sel-color': '#ff007f', 
                      '--sel-bg': 'rgba(255,0,127,0.08)',
                      '--sel-glow': 'rgba(255,0,127,0.2)'
                    }}
                    onClick={() => setPackageType('Premium')}
                  >
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ff007f', marginBottom: '4px' }}>
                      PREMIUM
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
                      $7,500 <span style={{ fontSize: '0.85rem', color: '#888' }}>MXN</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>
                      5 hrs • Truss completo • Ingeniero de iluminación
                    </div>
                  </div>
                </div>
              </div>

              {/* Horas Extra */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  color: '#ccc', fontSize: '0.85rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1px',
                  display: 'block', marginBottom: '12px'
                }}>
                  Horas Adicionales <span style={{ color: '#666' }}>(Máx. 2)</span>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[0, 1, 2].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setExtraHours(h)}
                      className={`option-card ${extraHours === h ? 'selected' : ''}`}
                      style={{ 
                        flex: 1,
                        '--sel-color': '#ffeb3b', 
                        '--sel-bg': 'rgba(255,235,59,0.08)',
                        '--sel-glow': 'rgba(255,235,59,0.2)'
                      }}
                    >
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: extraHours === h ? '#ffeb3b' : '#fff' }}>
                        {h === 0 ? 'Sin extra' : `+${h}h`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                        {h === 0 ? '5 hrs totales' : `$${h * 1200} extra`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Número de Personas */}
              <div>
                <label style={{ 
                  color: '#ccc', fontSize: '0.85rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1px',
                  display: 'block', marginBottom: '12px'
                }}>
                  <Users size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                  Número de Asistentes
                </label>
                <select
                  value={peopleRange}
                  onChange={e => setPeopleRange(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    border: '1px solid #2a2a4e', background: '#0a0a1a', color: '#fff',
                    fontSize: '1rem', outline: 'none', cursor: 'pointer',
                    appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                    backgroundSize: '18px'
                  }}
                >
                  <option value="10-100">10 a 100 personas (Precio base)</option>
                  <option value="100-200">100 a 200 personas (+$3,000)</option>
                  <option value="200-300">200 a 300 personas (+$5,500)</option>
                  <option value="300+">300 o más personas (+$7,500)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ========== COLUMNA DERECHA: RESUMEN Y PAGO ========== */}
          <div className="summary-sticky" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="section-card" style={{ 
              border: '2px solid rgba(255,0,127,0.3)',
              background: 'linear-gradient(145deg, rgba(10,10,26,0.95), rgba(20,5,20,0.95))',
              animationDelay: '0.4s'
            }}>
              <h2 className="font-cyber" style={{ 
                fontSize: '1.8rem', margin: '0 0 20px', 
                color: '#fff', textAlign: 'center'
              }}>
                RESUMEN
              </h2>

              {/* Desglose */}
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '14px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                paddingBottom: '20px', marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>Paquete {packageType}</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>
                    ${packageType === 'Base' ? '5,500' : '7,500'}
                  </span>
                </div>
                {extraHours > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Horas extra ({extraHours}h)</span>
                    <span style={{ color: '#ffeb3b', fontWeight: 700 }}>+${extraHoursCost.toLocaleString()}</span>
                  </div>
                )}
                {peopleAdditionalCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Ajuste por aforo</span>
                    <span style={{ color: '#ffeb3b', fontWeight: 700 }}>+${peopleAdditionalCost.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>Duración total</span>
                  <span style={{ color: '#00f2fe', fontWeight: 700 }}>{5 + extraHours} hrs</span>
                </div>
              </div>

              {/* Total Íntegro */}
              <div style={{ 
                textAlign: 'center', marginBottom: '25px',
                padding: '20px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255,235,59,0.1), rgba(255,235,59,0.02))',
                border: '1px solid rgba(255,235,59,0.2)'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                  Total del Evento
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffeb3b', lineHeight: '1' }}>
                  ${totalEvent.toLocaleString()}
                  <span style={{ fontSize: '1rem', color: '#888' }}> MXN</span>
                </div>
              </div>

              {/* OPCIÓN DE PAGO: ANTICIPO O COMPLETO (✅ CORRECCIÓN 3: Textos limpios de descuento) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  color: '#ccc', fontSize: '0.8rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1px',
                  display: 'block', marginBottom: '12px'
                }}>
                  ¿Cómo deseas pagar?
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Opción: Anticipo */}
                  <div 
                    className={`payment-option ${paymentType === 'anticipo' ? 'selected' : ''}`}
                    onClick={() => setPaymentType('anticipo')}
                  >
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: paymentType === 'anticipo' ? '6px solid #ff007f' : '2px solid #555',
                      transition: 'all 0.3s', flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                        Apartar con anticipo
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '2px' }}>
                        Paga $1,500 hoy y liquida el resto el día del evento
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '1.3rem', fontWeight: 800, color: '#25d366',
                      textAlign: 'right'
                    }}>
                      $1,500
                    </div>
                  </div>

                  {/* Opción: Pago Completo */}
                  <div 
                    className={`payment-option ${paymentType === 'completo' ? 'selected' : ''}`}
                    onClick={() => setPaymentType('completo')}
                  >
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: paymentType === 'completo' ? '6px solid #ff007f' : '2px solid #555',
                      transition: 'all 0.3s', flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                        Pagar precio completo
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '2px' }}>
                        Ahorra tiempo y liquida el total de tu evento ahora.
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1.3rem', fontWeight: 800, color: '#ffeb3b'
                      }}>
                        ${totalEvent.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monto a pagar ahora */}
              <div style={{ 
                textAlign: 'center', marginBottom: '20px',
                padding: '16px', borderRadius: '14px',
                background: paymentType === 'completo' 
                  ? 'linear-gradient(135deg, rgba(255,235,59,0.15), rgba(255,235,59,0.05))'
                  : 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(37,211,102,0.05))',
                border: paymentType === 'completo'
                  ? '1px solid rgba(255,235,59,0.3)'
                  : '1px solid rgba(37,211,102,0.3)',
              }}>
                <div style={{ 
                  fontSize: '0.75rem', color: paymentType === 'completo' ? '#ffeb3b' : '#25d366',
                  textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700,
                  marginBottom: '6px'
                }}>
                  Monto a pagar ahora
                </div>
                <div style={{ 
                  fontSize: '2.2rem', fontWeight: 800, 
                  color: paymentType === 'completo' ? '#ffeb3b' : '#25d366',
                  lineHeight: '1'
                }}>
                  ${montoPagar.toLocaleString()}
                  <span style={{ fontSize: '0.9rem', color: '#888', marginLeft: '4px' }}>MXN</span>
                </div>
                {paymentType === 'anticipo' && (
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '6px' }}>
                    Saldo pendiente: ${saldoPendiente.toLocaleString()} MXN
                  </div>
                )}
              </div>

              {/* Botón de pago */}
              <button 
                type="submit" 
                disabled={isRedirecting || isTimeSlotBlocked} 
                style={{ 
                  width: '100%',
                  background: isTimeSlotBlocked ? '#333' : 'linear-gradient(135deg, #009ee3, #0077b6)', 
                  border: 'none',
                  padding: '18px', borderRadius: '16px', color: '#fff', 
                  fontSize: '1.1rem', fontWeight: 800,
                  cursor: isTimeSlotBlocked ? 'not-allowed' : 'pointer', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  textTransform: 'uppercase', letterSpacing: '1px',
                  opacity: (isRedirecting || isTimeSlotBlocked) ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: isTimeSlotBlocked ? 'none' : '0 8px 30px rgba(0,158,227,0.3)'
                }}
                onMouseEnter={e => {
                  if (!isTimeSlotBlocked && !isRedirecting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,158,227,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isTimeSlotBlocked ? 'none' : '0 8px 30px rgba(0,158,227,0.3)';
                }}
              >
                <CreditCard size={22} />
                {isRedirecting ? 'Procesando...' : `Pagar ${paymentType === 'completo' ? 'completo' : 'anticipo'}`}
              </button>

              {/* Procesando */}
              {isRedirecting && (
                <div style={{ 
                  marginTop: '16px', 
                  background: 'linear-gradient(135deg, rgba(0,242,254,0.1), rgba(0,242,254,0.02))', 
                  border: '1px solid rgba(0,242,254,0.3)', 
                  padding: '14px', borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center',
                  animation: 'fadeInUp 0.3s ease'
                }}>
                  <div style={{ 
                    width: '20px', height: '20px', border: '2px solid #00f2fe',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span style={{ color: '#00f2fe', fontWeight: 700, fontSize: '0.9rem' }}>
                    Redirigiendo a Mercado Pago...
                  </span>
                </div>
              )}

              {/* Seguridad */}
              <div style={{ 
                marginTop: '16px', textAlign: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                color: '#555', fontSize: '0.75rem'
              }}>
                <ShieldCheck size={14} color="#25d366" />
                Pago seguro procesado por Mercado Pago
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}