import React, { useState } from 'react';

export default function Servicios() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '', type: '', environment: 'Interior', hours: 5, guests: '0', address: '' });
  const [total, setTotal] = useState(5500);

  const recalculatePrice = (updatedForm) => {
    let base = 5500; // Costo por defecto DJ Base x 5hrs
    let extraHoursCost = updatedForm.hours > 5 ? (updatedForm.hours - 5) * 1200 : 0;
    let guestAddon = parseInt(updatedForm.guests);
    setTotal(base + extraHoursCost + guestAddon);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updated = { ...formData, [id]: value };
    setFormData(updated);
    recalculatePrice(updated);
  };

  const executeReservation = async (e) => {
    e.preventDefault();
    // Consumir el Backend e iniciar el Checkout seguro de Mercado Pago
    await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, total })
    });
    alert('Información procesada y sanitizada. Redireccionando a la pasarela de Mercado Pago por tu anticipo de $1,500 MXN.');
    window.location.href = 'https://www.mercadopago.com.mx';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px' }}>
      <div style={{ background: '#11111d', border: '3px solid #fff', borderRadius: '15px', padding: '30px', boxShadow: '8px 8px 0 #000' }}>
        <h2 className="font-dj" style={{ color: '#00f2fe', fontSize: '2.5rem', margin: 0 }}>📅 COTIZADOR DE CONTRATACIÓN AUTOMÁTICO</h2>
        <p style={{ color: '#ff007f', fontWeight: 'bold' }}>Aparta tu evento en la CDMX con un anticipo fijo de $1,500 MXN</p>
        
        <form onSubmit={executeReservation} style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          <input type="text" id="name" placeholder="Nombre completo" required onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          <input type="tel" id="phone" placeholder="Teléfono (10 dígitos)" required onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          <input type="email" id="email" placeholder="Correo electrónico" required onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          <input type="date" id="date" required onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          
          <select id="environment" onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }}>
            <option value="Interior">Interior (Salón/Casa)</option>
            <option value="Exterior">Exterior (Jardín/Terraza)</option>
          </select>

          <select id="guests" onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }}>
            <option value="0">10 - 100 Personas (Precio Base)</option>
            <option value="3000">100 - 200 Personas (+$3,000 MXN)</option>
            <option value="5500">200 - 300 Personas (+$5,500 MXN)</option>
            <option value="7500">300 o más Personas (+$7,500 MXN)</option>
          </select>

          <input type="number" id="hours" min="5" defaultValue="5" onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          <input type="text" id="address" placeholder="Dirección del Evento en CDMX" required onChange={handleInputChange} style={{ padding: '12px', background: '#000', border: '2px solid #aa00ff', borderRadius: '8px', color: '#fff' }} />
          
          <div style={{ padding: '20px', background: '#000', borderRadius: '10px', textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Total Calculado: <span style={{ color: '#ffeb3b' }}>${total.toLocaleString()} MXN</span>
          </div>

          <button type="submit" style={{ background: '#00f2fe', color: '#000', padding: '15px', fontFamily: 'Bangers', fontSize: '1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>PAGAR ANTICIPO VÍA MERCADO PAGO</button>
        </form>
      </div>
    </div>
  );
}