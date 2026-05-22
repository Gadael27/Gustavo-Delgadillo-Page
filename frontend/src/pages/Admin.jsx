import React, { useState } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sales, setSales] = useState([]);

  const executeAuth = (e) => {
    e.preventDefault();
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    if (u === 'gustavo_admin' && p === 'GDL2026_secure') {
      setIsAuthenticated(true);
      fetch('http://localhost:5000/api/admin/sales')
        .then(res => res.json())
        .then(data => setSales(data));
    } else {
      alert('Credenciales inválidas.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '150px auto', background: '#11111d', padding: '30px', borderRadius: '10px', border: '2px solid #ff007f' }}>
        <h2 className="font-dj">🔒 PANEL DE ADMINISTRADOR</h2>
        <form onSubmit={executeAuth} style={{ display: 'grid', gap: '15px' }}>
          <input type="text" id="user" placeholder="Usuario" required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f2fe' }} />
          <input type="password" id="pass" placeholder="Contraseña" required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f2fe' }} />
          <button type="submit" style={{ background: '#ff007f', border: 'none', padding: '12px', color: '#fff', fontFamily: 'Bangers', fontSize: '1.2rem', cursor: 'pointer' }}>AUTENTICAR</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '100px auto', padding: '20px' }}>
      <h2 className="font-dj" style={{ color: '#00f2fe' }}>🎚️ REGISTRO DE VENTAS (ORDENADO POR ARTÍCULO)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: '#00f2fe' }}>
            <th style={{ padding: '12px', border: '1px solid #333' }}>Artículo</th>
            <th style={{ padding: '12px', border: '1px solid #333' }}>Categoría</th>
            <th style={{ padding: '12px', border: '1px solid #333' }}>Monto Liquidado</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '12px' }}>{sale.article}</td>
              <td style={{ padding: '12px' }}>{sale.category}</td>
              <td style={{ padding: '12px', color: '#ffeb3b' }}>${sale.total} MXN</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}