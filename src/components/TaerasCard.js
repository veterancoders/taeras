import { useEffect, useRef } from 'react';

export default function TaerasCard({ style = {}, size = 'normal' }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const scale = size === 'small' ? 0.72 : size === 'large' ? 1.15 : 1;
  const w = Math.round(340 * scale);
  const h = Math.round(210 * scale);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -16;
      const rotY = ((x - cx) / cx) * 16;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,212,212,0.28) 0%, transparent 65%)`;
      }
    };
    const handleLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      if (glowRef.current) glowRef.current.style.background = 'none';
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => { card.removeEventListener('mousemove', handleMouseMove); card.removeEventListener('mouseleave', handleLeave); };
  }, []);

  const fs = (n) => Math.round(n * scale);

  return (
    <div ref={cardRef} style={{
      width: w, height: h, borderRadius: 20,
      background: 'linear-gradient(135deg, #003d3d 0%, #001a2e 55%, #002a3a 100%)',
      boxShadow: 'rgba(0, 0, 0, 0.55) 0px 32px 80px, rgba(0, 180, 180, 0.57) 0px 0px 0px 1px, rgba(255, 255, 255, 0.07) 0px 1px 0px inset',
      position: 'relative', overflow: 'hidden', cursor: 'pointer',
      transition: 'transform 0.18s ease', flexShrink: 0, ...style,
    }}>
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', zIndex: 4 }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'linear-gradient(105deg, transparent 38%, rgba(0,212,212,0.08) 50%, transparent 62%)',
        animation: 'shimmer 3.5s infinite linear', pointerEvents: 'none', zIndex: 3,
      }} />
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.07, zIndex: 1 }} width={w} height={h} viewBox="0 0 340 210">
        <circle cx="285" cy="125" r="62" fill="none" stroke="#00d4d4" strokeWidth="1" />
        <circle cx="285" cy="125" r="46" fill="none" stroke="#00d4d4" strokeWidth="0.5" />
        <line x1="0" y1="78" x2="200" y2="78" stroke="#00d4d4" strokeWidth="0.5" />
        <line x1="0" y1="138" x2="150" y2="138" stroke="#00d4d4" strokeWidth="0.5" />
        <rect x="22" y="93" width="36" height="28" rx="4" fill="none" stroke="#00d4d4" strokeWidth="0.8" />
      </svg>
      {/* Logo */}
      <div style={{ position: 'absolute', top: fs(20), left: 22, zIndex: 5 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: fs(22), fontWeight: 700, color: '#00d4d4', letterSpacing: 2 }}>TAERAS</span>
      </div>
      {/* Network circles */}
      <div style={{ position: 'absolute', top: fs(17), right: 20, zIndex: 5, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: fs(28), height: fs(28), borderRadius: '50%', background: 'rgba(0,212,212,0.72)', marginRight: fs(-10) }} />
        <div style={{ width: fs(28), height: fs(28), borderRadius: '50%', background: 'rgba(0,212,212,0.38)' }} />
      </div>
      {/* Chip */}
      <div style={{
        position: 'absolute', top: fs(65), left: 22,
        width: fs(40), height: fs(30), borderRadius: 5,
        background: 'linear-gradient(135deg, #00b4b4 0%, #008a8a 50%, #00b4b4 100%)',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)', zIndex: 5,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 4,
      }}>
        {[0,1,2,3,4,5].map(i => <div key={i} style={{ height: fs(4), background: 'rgba(0,0,0,0.22)', borderRadius: 1 }} />)}
      </div>
      {/* Card number */}
      <div style={{
        position: 'absolute', bottom: fs(42), left: 22, right: 22, zIndex: 5,
        fontFamily: "'Courier New', monospace", fontSize: fs(13),
        color: 'rgba(255,255,255,0.72)', letterSpacing: 3, fontWeight: 500,
      }}>•••• •••• •••• 7842</div>
      {/* Bottom row */}
      <div style={{ position: 'absolute', bottom: fs(16), left: 22, right: 22, zIndex: 5, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: fs(9), color: 'rgba(255,255,255,0.35)', letterSpacing: 1, marginBottom: 2 }}>CARD HOLDER</div>
          <div style={{ fontSize: fs(11), color: 'rgba(255,255,255,0.82)', letterSpacing: 1, fontWeight: 600 }}>GLOBAL CITIZEN</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: fs(9), color: 'rgba(255,255,255,0.35)', letterSpacing: 1, marginBottom: 2 }}>EXPIRES</div>
          <div style={{ fontSize: fs(11), color: 'rgba(255,255,255,0.82)', letterSpacing: 1, fontWeight: 600 }}>12/28</div>
        </div>
      </div>
    </div>
  );
}
