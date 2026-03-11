import { useEffect, useRef, useState } from 'react';

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────
export const C = {
  teal: '#00b4b4',
  tealLight: '#00d4d4',
  tealDark: '#008a8a',
  gold: '#d4af37',
  goldLight: '#f0d080',
  heroBg: '#060d1a',
  white: '#ffffff',
  offWhite: '#f8f9fa',
  lightGrey: '#f1f3f5',
  midGrey: '#e9ecef',
  textDark: '#1a2332',
  textMid: '#4a5568',
  textLight: '#718096',
};

export const tealGrad = {
  background: 'linear-gradient(135deg, #00b4b4, #00d4d4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const goldGrad = {
  background: 'linear-gradient(135deg, #d4af37, #f0d080)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const glassStyleDark = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 20,
};

// Light theme glass
export const glassStyleLight = {
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(0,180,180,0.15)',
  borderRadius: 20,
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
};

// ── SECTION LABEL ─────────────────────────────────────────────────────────
export function SectionLabel({ children, light = false }) {
  return (
    <div style={{
      display: 'inline-block',
      color: C.teal, fontSize: 11, letterSpacing: 3,
      textTransform: 'uppercase', marginBottom: 16,
      borderBottom: `1px solid rgba(0,180,180,0.35)`,
      paddingBottom: 6, fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
    }}>{children}</div>
  );
}

// ── GLASS CARD (light variant) ─────────────────────────────────────────────
export function LightCard({ children, style = {}, hover = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderRadius: 20,
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,180,180,0.15)'
          : '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        ...style,
      }}
    >{children}</div>
  );
}

export function GlassCard({ children, style = {}, hover = false, dark = false }) {
  const [hovered, setHovered] = useState(false);
  if (!dark) return <LightCard style={style} hover={hover}>{children}</LightCard>;
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        ...glassStyleDark,
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
        borderColor: hovered ? 'rgba(0,180,180,0.3)' : 'rgba(255,255,255,0.12)',
        ...style,
      }}
    >{children}</div>
  );
}

// ── COUNTER ────────────────────────────────────────────────────────────────
export function Counter({ target, prefix = '', suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000, step = 16, steps = dur / step;
        let cur = 0;
        const timer = setInterval(() => {
          cur++;
          const ease = 1 - Math.pow(1 - cur / steps, 3);
          setVal(target * ease);
          if (cur >= steps) { setVal(target); clearInterval(timer); }
        }, step);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}{suffix}</span>;
}

// ── REVEAL ─────────────────────────────────────────────────────────────────
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, visible] = useReveal();
  const map = { up: 'translateY(50px)', left: 'translateX(-50px)', right: 'translateX(50px)', fade: 'scale(0.96)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : (map[direction] || 'translateY(50px)'),
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ── PAGE HERO (white pages) ────────────────────────────────────────────────
export function PageHero({ label, title, subtitle, children, light = true }) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: 140, paddingBottom: 80,
      padding: '140px 5% 80px',
      overflow: 'hidden',
      background: light ? 'linear-gradient(160deg, #f0fafa 0%, #e6f7f7 40%, #f8f9fa 100%)' : '#060d1a',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,180,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Reveal><SectionLabel>{label}</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(38px,6vw,68px)',
            fontWeight: 700, lineHeight: 1.08,
            marginBottom: 20, marginTop: 8,
            color: C.textDark,
          }}>{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p style={{ color: C.textMid, fontSize: 17, maxWidth: 580, margin: '0 auto 32px', lineHeight: 1.75 }}>{subtitle}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </div>
    </section>
  );
}

// ── YIELD CALCULATOR ─────────────────────────────────────────────────────
export function YieldCalculator({ dark = false }) {
  const [spend, setSpend] = useState(1500);
  const monthly = Math.round(spend * 0.047);
  const annual = monthly * 12;
  const shares = (annual / 245).toFixed(1);
  const pct = ((spend - 100) / 4900) * 100;

  const bg = dark
    ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,180,180,0.2)' }
    : { background: '#fff', border: '1px solid #e9ecef', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' };

  return (
    <div style={{ ...bg, borderRadius: 24, padding: '40px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ color: dark ? 'rgba(255,255,255,0.6)' : C.textMid, fontSize: 13, letterSpacing: 1 }}>MONTHLY TRAVEL SPEND</span>
          <span style={{ color: C.teal, fontSize: 28, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>${spend.toLocaleString()}</span>
        </div>
        <div style={{ position: 'relative', height: 6, background: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', borderRadius: 3 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#00b4b4,#00d4d4)', borderRadius: 3 }} />
          <input type="range" min="100" max="5000" value={spend}
            onChange={e => setSpend(Number(e.target.value))}
            style={{ position: 'absolute', inset: '-8px 0', width: '100%', height: '22px', opacity: 0, cursor: 'pointer', zIndex: 2 }}
          />
          <div style={{
            position: 'absolute', top: '50%',
            left: `calc(${pct}% - 10px)`, transform: 'translateY(-50%)',
            width: 20, height: 20, borderRadius: '50%',
            background: C.teal, boxShadow: `0 0 14px rgba(0,180,180,0.5)`,
            pointerEvents: 'none', zIndex: 1,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ color: dark ? 'rgba(255,255,255,0.2)' : '#aaa', fontSize: 11 }}>$100</span>
          <span style={{ color: dark ? 'rgba(255,255,255,0.2)' : '#aaa', fontSize: 11 }}>$5,000</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { label: 'Est. Monthly Yield', value: `$${monthly}` },
          { label: 'Annual Portfolio', value: `$${annual.toLocaleString()}` },
          { label: 'Shares (AAPL)', value: shares },
        ].map((item, i) => (
          <div key={i} style={{
            background: dark ? 'rgba(255,255,255,0.04)' : '#f8f9fa',
            border: dark ? '1px solid rgba(0,180,180,0.12)' : '1px solid #e9ecef',
            borderRadius: 14, padding: '20px 14px', textAlign: 'center',
          }}>
            <div style={{ color: C.teal, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", marginBottom: 6 }}>{item.value}</div>
            <div style={{ color: dark ? 'rgba(255,255,255,0.4)' : C.textLight, fontSize: 10, letterSpacing: 1 }}>{item.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  { q: 'What is Taeras?', a: 'Taeras is the world\'s first travel-equity platform. Every time you use your Taeras card to pay for travel — flights, hotels, rides, restaurants — you automatically earn fractional shares of the world\'s biggest companies like Apple, Microsoft, and S&P 500 ETFs.' },
  { q: 'Is Taeras a bank?', a: 'No. Taeras is not a bank. We are a travel-equity platform that partners with licensed financial institutions to provide card services and brokerage for fractional share ownership.' },
  { q: 'How do I actually earn shares?', a: 'Every booking generates a travel commission. Instead of keeping it, Taeras automatically converts it into fractional shares of AAPL, MSFT, or SPY on your behalf. Zero effort required.' },
  { q: 'Which currencies are supported?', a: 'Taeras supports 150+ currencies including NGN, USD, EUR, GBP, TRY, and more. Your dashboard shows Naira, Dollar, and Euro wallets side by side.' },
  { q: 'What is AI Geo-Matching?', a: 'The moment you land anywhere in the world, Taeras detects your location and optimizes your card for local currency spending with zero FX markup. You get a concierge notification, not a fraud alert.' },
  { q: 'Can I book flights and hotels inside the app?', a: 'Yes.However we are not a travel company but the taeras booking engine let you search flight and hotels without leaving the site.' },
  { q: 'How much can I realistically earn in shares?', a: 'At any travel spend, the amount you could earn depends on the commission from the airline or hotel. On average, Taeras users earn the equivalent of 3-5% of their travel spend in shares.' },
  { q: 'Is my money safe?', a: 'Yes. Your cash is held by licensed banking partners. Your shares are held in regulated brokerage accounts. Taeras operates as a technology layer over regulated financial infrastructure.' },
  { q: 'Which countries is Taeras available in?', a: 'Taeras is currently in private beta across 14 countries. We are expanding rapidly. Join the waitlist to secure your spot.' },
  { q: 'Are there any fees?', a: 'Zero FX markup. Zero hidden fees. Taeras earns from the travel commission ecosystem — not from your pocket.' },
];

export function FaqAccordion({ dark = false }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {FAQ_ITEMS.map((item, i) => (
        <div key={i}
          onClick={() => setActive(active === i ? null : i)}
          style={{
            background: active === i
              ? (dark ? 'rgba(0,180,180,0.06)' : '#f0fafa')
              : (dark ? 'rgba(255,255,255,0.02)' : '#fff'),
            border: `1px solid ${active === i ? 'rgba(0,180,180,0.3)' : (dark ? 'rgba(255,255,255,0.05)' : '#e9ecef')}`,
            borderRadius: 14, padding: '20px 24px',
            cursor: 'pointer', transition: 'all 0.3s',
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <span style={{ fontWeight: 500, fontSize: 15, color: active === i ? (dark ? '#fff' : C.textDark) : (dark ? 'rgba(255,255,255,0.75)' : C.textMid), lineHeight: 1.4 }}>{item.q}</span>
            <span style={{ color: C.teal, fontSize: 22, lineHeight: 1, flexShrink: 0, transition: 'transform 0.3s', transform: active === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
          </div>
          <div style={{ overflow: 'hidden', maxHeight: active === i ? 200 : 0, transition: 'max-height 0.4s ease' }}>
            <p style={{ color: dark ? 'rgba(255,255,255,0.5)' : C.textMid, fontSize: 14, lineHeight: 1.75, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : '#f0f0f0'}` }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── WAITLIST MODAL ─────────────────────────────────────────────────────────
export function WaitlistModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  // Close on ESC
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  // Save to localStorage
  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setErr('Please enter a valid email address'); return; }
    const entry = { name, email, country, joinedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('taeras_waitlist') || '[]');
    if (existing.some(e => e.email === email)) { setErr('This email is already on the waitlist!'); return; }
    localStorage.setItem('taeras_waitlist', JSON.stringify([...existing, entry]));
    setDone(true);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, padding: '44px 40px',
          maxWidth: 480, width: '100%', position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
          animation: 'fadeInUp 0.35s ease',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: '#f1f3f5', border: 'none', color: '#666',
          width: 32, height: 32, borderRadius: '50%',
          cursor: 'pointer', fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>×</button>

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: C.textDark, marginBottom: 12 }}>
              You're on the list!
            </h3>
            <p style={{ color: C.textMid, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Welcome to the movement, {name ? name.split(' ')[0] : 'traveler'}. We'll reach out as soon as your spot opens.
            </p>
            <div style={{ background: '#f0fafa', border: '1px solid rgba(0,180,180,0.2)', borderRadius: 12, padding: '14px 20px', display: 'inline-block' }}>
              <span style={{ color: C.teal, fontSize: 13, fontWeight: 600 }}>🔒 Position secured · Private Beta</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: C.teal, fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>JOIN THE WAITLIST</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: C.textDark, marginBottom: 8 }}>
                Claim your spot.
              </h3>
              <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.6 }}>
                Private Beta . No credit card required.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="text" placeholder="Full name (optional)"
                value={name} onChange={e => setName(e.target.value)}
                style={{ background: '#f8f9fa', border: '1px solid #e9ecef', color: C.textDark, padding: '13px 16px', borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans'", outline: 'none', width: '100%' }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = '#e9ecef'}
              />
              <input
                type="email" placeholder="Email address *"
                value={email} onChange={e => { setEmail(e.target.value); setErr(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ background: '#f8f9fa', border: `1px solid ${err ? '#f87171' : '#e9ecef'}`, color: C.textDark, padding: '13px 16px', borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans'", outline: 'none', width: '100%' }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = err ? '#f87171' : '#e9ecef'}
              />
              <input
                type="text" placeholder="Country (optional)"
                value={country} onChange={e => setCountry(e.target.value)}
                style={{ background: '#f8f9fa', border: '1px solid #e9ecef', color: C.textDark, padding: '13px 16px', borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans'", outline: 'none', width: '100%' }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = '#e9ecef'}
              />
              {err && <p style={{ color: '#f87171', fontSize: 12, marginTop: -6 }}>{err}</p>}
              <button onClick={handleSubmit} style={{
                background: 'linear-gradient(135deg, #00b4b4, #008a8a)',
                color: '#fff', border: 'none', padding: '15px',
                borderRadius: 50, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: "'DM Sans'",
                boxShadow: '0 6px 24px rgba(0,180,180,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 32px rgba(0,180,180,0.45)'; }}
                onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 6px 24px rgba(0,180,180,0.35)'; }}
              >
                Join the Waitlist →
              </button>
            </div>
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: 11, marginTop: 14, letterSpacing: 1 }}>
              No spam. No credit card. Ever.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
