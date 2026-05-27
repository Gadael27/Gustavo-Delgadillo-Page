import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Disc, Zap, MapPin, MessageSquare, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Servicios() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  // 1. DATA OFICIAL DE PAQUETES CDMX SEGÚN REQUERIMIENTOS
  const djServices = [
    {
      id: 'Base',
      name: 'SERVICIO DJ & PRODUCCIÓN BASE',
      price: '$5,500',
      time: '5 Horas de Servicio',
      extraHour: '$1,200',
      color: '#00f2fe',
      description: 'Configuración ideal con excelente acústica e iluminación controlada para espacios medianos.',
      features: [
        'DJ Profesional con set interactivo y mezcla en vivo',
        'Cabina de DJ geométrica a elegir',
        'Sistema de audio optimizado (Bocinas de alta fidelidad)',
        'Sistemas de Luces audiorítmicas montadas',
        'Válido para CDMX (Al interior de la república requiere cotización)'
      ]
    },
    {
      id: 'Premium',
      name: 'SERVICIO HIGH ENERGY PREMIUM',
      price: '$7,500',
      time: '5 Horas de Servicio',
      extraHour: '$1,200',
      color: '#ff007f',
      description: 'Producción masiva con efectos especiales de club nocturno, pirotecnia y despliegue acústico robusto.',
      features: [
        'DJ Máster con set premium y mezcla de géneros en vivo',
        'Cabina de DJ geométrica premium a elegir',
        'Sistema de audio de alta potencia (4 Bocinas activas profesionales)',
        'Estructura de iluminación completa con Cabezas Robóticas y Lasers',
        'Máquinas de efectos: Máquinas de CO2 Megablast + Máquinas de Humo',
        'Pirotecnia fría integrada: Chisperos controlados para momentos cumbre'
      ]
    }
  ];

  // 2. DATA OFICIAL DE FAQS EXIGIDAS POR EL CLIENTE
  const faqs = [
    {
      q: '¿Qué tipo de evento es y qué música tocan?',
      a: 'Cubrimos Bodas, XV Años, Fiestas de Élite y Corporativos. La selección musical es totalmente abierta y adaptada a tus peticiones o géneros preferidos en vivo.'
    },
    {
      q: '¿Cómo influye si el espacio es abierto o cerrado?',
      a: 'Para espacios interiores calibramos el audio para evitar reverberación. En exteriores (jardines o terrazas) recomendamos el paquete Premium con 4 bocinas para garantizar que la presión del sonido no se disipe al aire libre.'
    },
    {
      q: '¿Cuántas personas pueden cubrir los precios base?',
      a: 'El precio base cubre eventos de 10 a 100 personas. Para aforos mayores, el sistema aplica un ajuste automático en la pestaña de Cotización debido a la necesidad de añadir más infraestructura de refuerzo sonoro.'
    },
    {
      q: '¿Realizan eventos fuera de la Ciudad de México?',
      a: 'Nuestros precios de lista están optimizados para la CDMX. Si tu evento es al interior de la república, puedes presionar el botón de WhatsApp para cotizar los viáticos de transporte de la infraestructura.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#04040c', minHeight: '100vh', padding: '120px 20px 60px 20px', color: '#fff', fontFamily: "'Bangers', cursive" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ENCABEZADO DE SERVICIOS */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#00f2fe', fontSize: '1.2rem', letterSpacing: '4px' }}>CDMX PRODUCTION HUB</span>
          <h1 style={{ fontSize: '4.5rem', margin: '10px 0', textShadow: '3px 3px #ff007f' }}>TARIFAS DE AUDIO & DJ</h1>
          <p style={{ fontFamily: 'sans-serif', color: '#888', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5, fontSize: '1rem' }}>
            Servicios profesionales parametrizados por tiempo y equipamiento. Aparta tu fecha congelando la tarifa con un anticipo fijo.
          </p>
        </div>

        {/* REQUERIMIENTO: GRID DE LOS DOS PRECIOS OFICIALES */}
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '40px', marginBottom: '80px' }}>
          {djServices.map((service) => (
            <div 
              key={service.id}
              style={{
                background: '#0a0a1f', border: `3px solid ${service.color}`, padding: '40px', borderRadius: '24px',
                display: 'flex', flexDirection: 'column', boxShadow: `0 0 30px rgba(0,242,254,0.05)`
              }}
            >
              <h2 style={{ fontSize: '2.3rem', color: service.color, margin: '0 0 10px 0', letterSpacing: '1px' }}>{service.name}</h2>
              <p style={{ fontFamily: 'sans-serif', color: '#aaa', fontSize: '0.95rem', margin: '0 0 25px 0', lineHeight: 1.5 }}>{service.description}</p>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px 25px', borderRadius: '12px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '3.5rem', color: '#fff', lineHeight: 1 }}>{service.price}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#888', marginLeft: '5px' }}>MXN / {service.time}</span>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#ccc' }}>
                  <div>Hora extra: <strong style={{ color: service.color }}>{service.extraHour}</strong></div>
                  <div>Anticipo fijo: <strong style={{ color: '#25d366' }}>$1,500</strong></div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flexGrow: 1 }}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '15px', fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#ddd', lineHeight: 1.4 }}>
                    <Check size={18} style={{ color: service.color, marginTop: '2px', flexShrink: 0 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* BOTÓN CONTRATAR -> ENVÍA AL FORMULARIO DE RESERVA */}
              <button 
                onClick={() => navigate('/cotizacion')}
                style={{
                  background: `linear-gradient(135deg, ${service.color}, #aa00ff)`, border: 'none', padding: '18px',
                  borderRadius: '12px', color: '#fff', fontSize: '1.5rem', fontFamily: "'Bangers', cursive",
                  cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }}
              >
                RESERVAR CON ANTICIPO DE $1,500
              </button>
            </div>
          ))}
        </div>

        {/* REQUERIMIENTO: BOTÓN WHATSAPP PARA EL INTERIOR DE LA REPÚBLICA */}
        <div style={{ background: 'rgba(13, 13, 35, 0.6)', border: '2px dashed #25d366', padding: '30px', borderRadius: '20px', textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            <MapPin style={{ color: '#25d366' }} />
            <h3 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>¿TU EVENTO ES FUERA DE LA CDMX?</h3>
          </div>
          <p style={{ fontFamily: 'sans-serif', color: '#aaa', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
            Para eventos al interior de la república mexicana calculamos viáticos logísticos personalizados de forma directa.
          </p>
          <a 
            href="https://wa.me/525534270341?text=Hola%20Gustavo,%20quiero%20cotizar%20un%20servicio%20de%20DJ%20al%20interior%20de%20la%20rep%C3%BAblica."
            target="_blank" rel="noreferrer"
            style={{
              background: '#25d366', color: '#fff', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none',
              fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 5px 15px rgba(37,211,102,0.2)'
            }}
          >
            <MessageSquare size={20} /> COTIZAR AL INTERIOR VÍA WHATSAPP
          </a>
        </div>

        {/* REQUERIMIENTO: SECCIÓN OFICIAL DE FAQS EXPANDIBLES */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff', textAlign: 'center', marginBottom: '30px', textShadow: '2px 2px #ff007f' }}>
            <HelpCircle style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} /> PREGUNTAS FRECUENTES
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                style={{ background: '#0d0d26', borderRadius: '12px', border: '1px solid #1c1c44', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '0.5px' }}>{faq.q}</span>
                  {openFaq === index ? <ChevronUp style={{ color: '#ff007f' }} /> : <ChevronDown style={{ color: '#00f2fe' }} />}
                </div>
                {openFaq === index && (
                  <div style={{ padding: '0 20px 20px 20px', fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#aaa', lineHeight: 1.5, borderTop: '1px solid #141438', paddingTop: '15px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}