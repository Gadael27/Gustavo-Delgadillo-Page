import React, { useState } from 'react';
import { Disc, Play, Pause, Instagram, MessageCircle } from 'lucide-react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));

  const togglePlayback = () => {
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4.5rem', textShadow: '4px 4px #ff007f', margin: 0 }}>GUSTAVO DELGADILLO</h1>
      <p style={{ fontFamily: 'Permanent Marker', color: '#ffeb3b', fontSize: '1.8rem' }}>EXPERIENCIA DJ INMERSIVA & PRODUCCIÓN AUDIOPREMIUM</p>

      {/* TORNAMESA DIGITAL INTERACTIVA */}
      <div style={{ background: '#0d0d14', border: '3px solid #00f2fe', padding: '30px', borderRadius: '20px', maxWidth: '400px', margin: '40px auto', boxShadow: '0 0 30px rgba(0,242,254,0.3)' }}>
        <h3 className="font-dj" style={{ color: '#ff007f' }}>LIVE MIX SET SESSION</h3>
        <Disc size={80} style={{ color: '#00f2fe', animation: isPlaying ? 'spin 3s linear infinite' : 'none', margin: '20px 0' }} />
        <br />
        <button onClick={togglePlayback} style={{ background: 'linear-gradient(135deg, #00f2fe, #aa00ff)', border: 'none', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'Bangers', fontSize: '1.2rem' }}>
          {isPlaying ? <Pause inline /> : <Play inline />} {isPlaying ? 'PAUSAR DECK' : 'REPRODUCIR MIX'}
        </button>
      </div>

      {/* CANALES SOCIAL MEDIA DIRECTOS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ background: '#e1306c', padding: '15px 30px', borderRadius: '10px', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}><Instagram /> Instagram</a>
        <a href="https://wa.me/525500000000" target="_blank" rel="noreferrer" style={{ background: '#25d366', padding: '15px 30px', borderRadius: '10px', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}><MessageCircle /> WhatsApp Asesoría</a>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}