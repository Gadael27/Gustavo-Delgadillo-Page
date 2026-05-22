import React from 'react';

const products = [
  { name: 'Cabina Diamante Oro Espejo', price: 3000, size: '1.02m x 1m x 50cm', asset: 'Cabina-Oro.jpeg', desc: 'Relieves geométricos premium con reflejo dorado brillante espejo.' },
  { name: 'Cabina Diamante Plata Espejo', price: 3000, size: '1.02m x 1m x 50cm', asset: 'Cabina-Plata.jpeg', desc: 'Fachada prismática cromada de alta refracción ideal para juegos de luces láser.' },
  { name: 'Cabina Mate Black Diamante', price: 3000, size: '1.02m x 1m x 50cm', asset: 'Cabina-Negra.jpeg', desc: 'Cortes poligonales en negro mate que absorben la iluminación con elegancia extrema.' }
];

export default function Catalogo() {
  return (
    <div style={{ maxWidth: '1200px', margin: '100px auto', padding: '20px' }}>
      <h2 className="font-dj" style={{ textCenter: 'center', fontSize: '3rem', color: '#ffeb3b', textAlign: 'center', marginBottom: '40px' }}>🛒 CATÁLOGO DE CABINAS EXCLUSIVAS</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {products.map((prod, index) => (
          <div key={index} style={{ background: '#0d0d14', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ height: '250px', background: '#222' }}>
              <img src={`/assets/${prod.asset}`} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <h3>{prod.name}</h3>
              <p style={{ color: '#00f2fe', fontWeight: 'bold', fontSize: '1.5rem', margin: '5px 0' }}>${prod.price} MXN</p>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{prod.desc}</p>
              <p style={{ fontSize: '0.8rem' }}><strong>Dimensiones:</strong> {prod.size}</p>
              <a href="https://amazon.com.mx" target="_blank" rel="noreferrer" style={{ display: 'block', textCenter: 'center', background: '#ff9900', color: '#000', padding: '10px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}>Comprar en Amazon</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}