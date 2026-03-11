import { useState, useEffect, useRef } from 'react';
import {
  C, SectionLabel, LightCard, Counter, Reveal,
  tealGrad, goldGrad, YieldCalculator, FaqAccordion, WaitlistModal
} from '../components/UI';
import TaerasCard from '../components/TaerasCard';

// ─── REAL-IMAGE HERO CARDS ─────────────────────────────────────────────────
const CARD_DATA = [
  {
    step: '01',
    title: 'Travel normally',
    subtitle: 'Flights, hotels, and global mobility.',
    tag: 'Flight booking — €420',
    badge: { label: 'TRAVEL SPEND', value: '€1,240' },
    color: '#00c2c2',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&auto=format&fit=crop',
    // airport terminal / planes
  },
  {
    step: '02',
    title: 'Value captured',
    subtitle: 'Our engine processes every transaction.',
    tag: 'Taeras Engine — Processing',
    badge: { label: 'CAPTURED', value: '€22.60' },
    color: '#d4af37',
    img: '/payment.jpg',
    // person with phone / card paying
  },
  {
    step: '03',
    title: 'Equity allocated',
    subtitle: 'Fractional shares land in your portfolio.',
    tag: 'AAPL allocation — +$4.20',
    badge: { label: 'PORTFOLIO', value: '$6,320' },
    color: '#a3e635',
    img: '/portfolio.jpg',
    // person checking portfolio / laptop
  },
];

function HeroCards() {
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setLine1(true), 500);
        setTimeout(() => setLine2(true), 1000);
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 1120, margin: '0 auto', padding: '0 16px' }}>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        gap: 40, justifyContent: 'center', flexWrap: 'wrap',
      }}>
        {CARD_DATA.map((card, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i === 1 ? '1 1 300px' : '1 1 280px' }}>
            {/* THE CARD */}
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                borderRadius: 22,
                overflow: 'hidden',
                background: '#0a1628',
                border: i === 1
                  ? '1px solid rgba(0,212,212,0.35)'
                  : '1px solid rgba(255,255,255,0.1)',
                boxShadow: hovered === i
                  ? `0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px ${card.color}40`
                  : i === 1
                    ? '0 16px 48px rgba(0,0,0,0.45), 0 0 40px rgba(0,180,180,0.08)'
                    : '0 8px 32px rgba(0,0,0,0.3)',
                transform: hovered === i ? 'translateY(-10px) scale(1.015)' : i === 1 ? 'translateY(-6px)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative',
              }}
            >
              {/* Image area */}
              <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                    transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                }} />
                {/* Step pill */}
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: `1px solid ${card.color}50`,
                  borderRadius: 20, padding: '4px 12px',
                  color: card.color, fontSize: 10,
                  fontWeight: 700, letterSpacing: 2,
                }}>
                  STEP {card.step}
                </div>
                {/* Badge top-right */}
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12, padding: '8px 14px',
                  textAlign: 'right',
                }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, marginBottom: 2 }}>
                    {card.badge.label}
                  </div>
                  <div style={{
                    color: card.color, fontWeight: 700, fontSize: 17,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}>
                    {card.badge.value}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '18px 20px 20px' }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20, fontWeight: 700,
                  color: '#fff', marginBottom: 5, lineHeight: 1.2,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.45)', fontSize: 12,
                  lineHeight: 1.6, marginBottom: 14,
                }}>
                  {card.subtitle}
                </p>
                {/* Transaction tag */}
                <div style={{
                  background: `${card.color}0f`,
                  border: `1px solid ${card.color}28`,
                  borderRadius: 10, padding: '9px 13px',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{card.tag}</span>
                </div>
              </div>
            </div>

         
          </div>
        ))}
      </div>

      {/* Mobile: show vertical stacked on small screen */}
      <style>{`
        @media (max-width: 700px) {
          .hero-cards-row { flex-direction: column !important; }
          .hero-connector { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─── CARD REVEAL ───────────────────────────────────────────────────────────
function CardRevealSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      padding: '100px 5%',
      background: 'linear-gradient(160deg, #020c14 0%, #001e2b0f 50%, #020c14 100%)',
      display: 'flex', flexDirection: 'column', gap: 24,
      alignItems: 'center', textAlign: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,180,0.13) 0%, transparent 70%)',
      pointerEvents: 'none',
      }} />

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'all 0.7s ease',
        position: 'relative', zIndex: 1, marginBottom: 12,
      }}>
        <div style={{ color: 'rgba(0,212,212,0.65)', fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 14 }}>
          THE FOUNDATION
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px,4.5vw,52px)',
          fontWeight: 700, color: '#fff', lineHeight: 1.1,
        }}>
          It all begins with the
        </h2>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px,4.5vw,52px)',
          fontWeight: 700, lineHeight: 1.1, ...tealGrad,
        }}>
          Taeras Card.
        </h2>
      </div>

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(80px) scale(0.92)',
        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.25s',
        position: 'relative', zIndex: 1,
        marginBottom: 36,
        filter: visible ? 'drop-shadow(0 40px 60px rgba(0,180,180,0.25))' : 'none',
      }}>
        <TaerasCard size="large" />
      </div>

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'all 0.7s ease 0.55s',
        display: 'flex', gap: 32, flexWrap: 'wrap',
        justifyContent: 'center', position: 'relative', zIndex: 1,
      }}>
        {[['0%', 'FX Markup'], ['150+', 'Countries'], ['24/7', 'Operation']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{
              color: '#00d4d4', fontFamily: "'Cormorant Garamond', serif",
              fontSize: 30, fontWeight: 700,
            }}>{v}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 2 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 3400);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { num: '01', title: 'Spend Anywhere', desc: 'Use your Taeras card in any currency, any country. From Lagos to Istanbul to London — it just works.', icon: '💳' },
    { num: '02', title: 'We Capture the Commission', desc: 'Every booking generates a travel commission. We take zero. It\'s all yours — automatically.', icon: '⚡' },
    { num: '03', title: 'You Own the Return', desc: 'That commission is instantly converted into fractional shares of AAPL, MSFT, or SPY.', icon: '📈' },
    { num: '04', title: 'Investing Without Thinking', desc: 'Every payment turns into ownership. No trading. No effort. Just spend like normal.', icon: '🌍' },
  ];

  return (
    <div>

      {/* ════════════════════════════════════════════
          HERO — dark, centered text + image cards
      ════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(170deg, #020c14 0%, #041520 60%, #020c14 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingTop: 100, paddingBottom: 80,
        overflow: 'hidden',
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(0,180,180,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,180,0.055) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,180,0.1) 0%, transparent 65%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,140,160,0.07) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* ── Headline block ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          maxWidth: 720,
          margin: 100,
          animation: 'fadeInUp 0.8s ease both',
        }}>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(50px, 8.5vw, 100px)',
            fontWeight: 700, lineHeight: 1.0,
            color: '#fff', marginBottom: 0,
          }}>
            Own the{' '}
            <span style={{
              ...tealGrad,
              fontStyle: 'italic',
            }}>World</span>
          </h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(50px, 8.5vw, 100px)',
            fontWeight: 700, lineHeight: 1.0,
            color: '#fff', marginBottom: 28,
          }}>
            While You Travel.
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 17, lineHeight: 1.8,
            maxWidth: 540, margin: '0 auto 40px',
          }}>
            Pay in any currency. Book flights, hotels, rides, or restaurants on any platform — and automatically earn fractional shares of the world's biggest companies.
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(135deg, #00b4b4, #007a7a)',
                color: '#fff', border: 'none',
                padding: '15px 38px', borderRadius: 50,
                fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: "'DM Sans'",
                letterSpacing: 0.4,
                boxShadow: '0 8px 32px rgba(0,180,180,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,180,180,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,180,180,0.4)'; }}
            >
              Join the Waitlist →
            </button>
         
          </div>
        </div>

        {/* ── Image Cards ── */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', animation: 'fadeInUp 1s ease 0.3s both' }}>
          <HeroCards />
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6, zIndex: 2,
        }}>

        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,180,180,0.1)',
        borderBottom: '1px solid rgba(0,180,180,0.1)',
        padding: '12px 0',
        background: '#ffffff',
      }}>
        <div style={{ display: 'flex', animation: 'ticker 24s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array(4).fill(null).map((_, ri) => (
            <div key={ri} style={{ display: 'flex' }}>
              {['AAPL +8.2%', 'MSFT +5.1%', 'SPY +3.8%', 'Turkish Airlines → 5% back', 'Lagos → Istanbul · earn $47', 'Zero FX Markup · 150+ Countries', 'Own Every Trip · Build Real Wealth'].map((item, i) => (
                <span key={i} style={{
                  color: i % 2 === 0 ? '#00b4b4' : 'rgba(0, 0, 0, 0.92)',
                  fontSize: 12, letterSpacing: 2, padding: '0 36px',
                }}>
                  {item} <span style={{ color: 'rgb(0, 180, 180)' }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BELOW HERO — WHITE / LIGHT SECTIONS
      ════════════════════════════════════════════ */}

      {/* ── PAIN POINTS ── #fff ── */}
      <section style={{ background: '#fff', padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(30px,5vw,58px)', fontWeight: 700,
              lineHeight: 1.08, marginTop: 10, marginBottom: 16, color: C.textDark,
            }}>
              You've been earning points for years.<br />
              <span style={tealGrad}>What do you actually own?</span>
            </h2>
            <p style={{ color: C.textMid, fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
              Airline miles expire. Cashback buys coffee. Your loyalty earns them profit — not you.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              { icon: '💳', title: 'Points Expire', desc: 'Airlines quietly devalue your miles overnight. You stay loyal; they stay profitable.', stat: '~$17B', sub: 'in miles expire annually', accent: '#fee2e2', accentText: '#b91c1c' },
              { icon: '🌍', title: 'FX Robbery', desc: "Your bank silently charges 3–5% on every international swipe. You'd never agree if they asked.", stat: '3–5%', sub: 'hidden on every swipe', accent: '#fef3c7', accentText: '#92400e' },
              { icon: '📉', title: 'Zero Ownership', desc: 'Cashback returns fractions of pennies. None of it builds a financial future for you.', stat: '0%', sub: 'real wealth built', accent: '#dbeafe', accentText: '#1e40af' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <LightCard hover style={{ padding: '32px 28px', height: '100%' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: item.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, marginBottom: 20,
                  }}>{item.icon}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: C.textDark }}>{item.title}</h3>
                  <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.72, marginBottom: 22 }}>{item.desc}</p>
                  <div style={{ paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ color: C.teal, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>{item.stat} </span>
                    <span style={{ color: C.textLight, fontSize: 12 }}>{item.sub}</span>
                  </div>
                </LightCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} style={{ marginTop: 40 }}>
            <div style={{
              textAlign: 'center',
              padding: '30px 36px',
              background: 'linear-gradient(135deg, #f0fafa 0%, #e8f7f7 100%)',
              border: '1px solid rgba(0,180,180,0.18)',
              borderRadius: 18,
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24, color: C.teal, fontStyle: 'italic',
              }}>
                "There is a better way. Every spend becomes ownership."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CARD REVEAL ── dark ── */}
      <CardRevealSection />

      {/* ── HOW IT WORKS ── #f8f9fa ── */}
      <section style={{ background: '#f8f9fa', padding: '100px 5%' }} id='howitworks'>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <Reveal direction="left"><SectionLabel>How Taeras Works</SectionLabel></Reveal>
              <Reveal direction="left" delay={0.1}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700,
                  marginBottom: 14, marginTop: 10, lineHeight: 1.08, color: C.textDark,
                }}>
                  Four steps.<br /><span style={tealGrad}>Fully automatic.</span>
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.2}>
                <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 30, fontSize: 15 }}>
                  You just travel. Taeras handles everything — capturing commissions, converting them to shares, building your portfolio with every swipe.
                </p>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {steps.map((step, i) => (
                  <Reveal key={i} direction="left" delay={0.08 + i * 0.07}>
                    <div onClick={() => setActiveStep(i)} style={{
                      padding: '16px 20px', borderRadius: 14, cursor: 'pointer',
                      border: `1px solid ${activeStep === i ? 'rgba(0,180,180,0.28)' : '#e9ecef'}`,
                      background: activeStep === i ? '#f0fafa' : '#fff',
                      boxShadow: activeStep === i ? '0 4px 18px rgba(0,180,180,0.1)' : 'none',
                      transition: 'all 0.3s',
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                    }}>
                      <div style={{ color: C.teal, fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, flexShrink: 0, marginTop: 1 }}>{step.num}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: activeStep === i ? C.textDark : C.textMid, marginBottom: activeStep === i ? 5 : 0 }}>{step.title}</div>
                        {activeStep === i && <div style={{ color: C.textMid, fontSize: 13, lineHeight: 1.65 }}>{step.desc}</div>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <LightCard style={{ padding: '36px', textAlign: 'center', minHeight: 270, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>{steps[activeStep].icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.textDark, marginBottom: 10 }}>{steps[activeStep].title}</h3>
                  <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>{steps[activeStep].desc}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                    {steps.map((_, i) => (
                      <div key={i} onClick={() => setActiveStep(i)} style={{
                        width: i === activeStep ? 26 : 8, height: 8, borderRadius: 4,
                        background: i === activeStep ? C.teal : '#e9ecef',
                        transition: 'all 0.3s', cursor: 'pointer',
                      }} />
                    ))}
                  </div>
                </LightCard>
                <LightCard style={{ padding: '20px 22px' }}>
                  <div style={{ color: C.textLight, fontSize: 10, letterSpacing: 2, marginBottom: 12 }}>LIVE ACTIVITY</div>
                  {[
                    { label: 'Istanbul Hotel Booking', amount: '$320 spent', yield: '+$16 → AAPL' },
                    { label: 'Turkish Airlines LOS→IST', amount: '$480 spent', yield: '+$24 → SPY' },
                  ].map((tx, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderTop: i > 0 ? '1px solid #f5f5f5' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, color: C.textDark, marginBottom: 2 }}>{tx.label}</div>
                        <div style={{ fontSize: 11, color: C.textLight }}>{tx.amount}</div>
                      </div>
                      <div style={{ color: '#16a34a', fontSize: 13, fontWeight: 600 }}>{tx.yield}</div>
                    </div>
                  ))}
                </LightCard>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS ── #fff ── */}
      <section style={{ background: '#fff', padding: '60px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', border: '1px solid #e9ecef', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              {[
                { val: 10,  suffix: '%', decimals: 1, label: 'Commission captured' },
                { val: 12.4, suffix: '%', decimals: 1, label: 'Avg. Annual Return' },
                { val: 150, suffix: '+', label: 'Countries in Beta' },
                { val: 0, label: 'Effort Required' },
              ].map((s, i, arr) => (
                <div key={i} style={{ padding: '36px 24px', textAlign: 'center', background: '#fff', borderRight: i < arr.length - 1 ? '1px solid #e9ecef' : 'none' }}>
                  <div style={{ color: C.teal, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,50px)', fontWeight: 700, marginBottom: 6 }}>
                    <Counter target={s.val} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} />
                  </div>
                  <div style={{ color: C.textLight, fontSize: 11, letterSpacing: 2 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DASHBOARD ── #f8f9fa ── */}
      <section style={{ background: '#f8f9fa', padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, alignItems: 'center' }}>
          <Reveal direction="left">
            <LightCard style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: C.textDark }}>Your Portfolio</span>
                <span style={{ color: '#16a34a', fontSize: 13, background: '#dcfce7', padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>+12.4%</span>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 50, fontWeight: 700, color: C.teal }}>$4,280</div>
                <div style={{ color: C.textLight, fontSize: 12 }}>from travel spending</div>
              </div>
              {[{ name: 'AAPL', pct: 8.2, w: '75%' }, { name: 'MSFT', pct: 5.1, w: '52%' }, { name: 'S&P 500', pct: 3.8, w: '38%' }].map((s, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: C.textMid }}>{s.name}</span>
                    <span style={{ color: '#16a34a', fontSize: 13, fontWeight: 600 }}>+{s.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: s.w, background: `linear-gradient(90deg,${C.teal},${C.tealLight})`, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
              <div style={{ paddingTop: 16, marginTop: 8, borderTop: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
                <div><div style={{ fontSize: 13, color: C.textDark }}>Istanbul Hotel</div><div style={{ fontSize: 11, color: C.textLight }}>$320 spent</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ color: '#16a34a', fontSize: 13, fontWeight: 600 }}>+$16</div><div style={{ fontSize: 11, color: C.textLight }}>→ AAPL</div></div>
              </div>
            </LightCard>
          </Reveal>
          <div>
            <Reveal direction="right"><SectionLabel>Dashboard</SectionLabel></Reveal>
            <Reveal direction="right" delay={0.1}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, marginTop: 10, marginBottom: 16, lineHeight: 1.08, color: C.textDark }}>
                Multi currencies.<br /><span style={tealGrad}>One clean view.</span>
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                Your Naira, Dollar, and Euro wallets live side by side. Taeras's AI scans your upcoming trips and tells you how much of your flight your current yield already covers.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.3}>
              <div style={{ background: '#f0fafa', border: '1px solid rgba(0,180,180,0.2)', borderLeft: `3px solid ${C.teal}`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <div style={{ color: C.teal, fontSize: 12, marginBottom: 5, fontWeight: 600 }}>✦ AI INSIGHT</div>
                <p style={{ color: C.textMid, fontSize: 14, fontStyle: 'italic', lineHeight: 1.65 }}>
                  "Heading to Vienna next month? Your yield covers 15% of your flight cost."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── #fff ── */}
      <section id="calculator" style={{ background: '#fff', padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Yield Calculator</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, marginTop: 10, marginBottom: 14, color: C.textDark }}>
              See what you <span style={tealGrad}>could own</span>
            </h2>
            <p style={{ color: C.textMid, maxWidth: 400, margin: '0 auto' }}>Move the slider. Watch your portfolio grow.</p>
          </Reveal>
          <Reveal delay={0.15}><YieldCalculator dark={false} /></Reveal>
        </div>
      </section>

      {/* ── SMART PROTECTION ── #f8f9fa ── */}
      <section style={{ background: '#f8f9fa', padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <Reveal direction="left"><SectionLabel>Smart Protection</SectionLabel></Reveal>
            <Reveal direction="left" delay={0.1}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, marginTop: 10, marginBottom: 16, lineHeight: 1.08, color: C.textDark }}>
                Protection that<br /><span style={tealGrad}>travels with you.</span>
              </h2>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
              <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                The moment you land, Taeras detects your location and quietly optimizes your card for local currency. You get a concierge notification — not a fraud alert.
              </p>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '🌍', title: '0% FX Markup', desc: 'Zero hidden fees on international spending', bg: '#f0fafa' },
                { icon: '🛡️', title: 'Real-time Protection', desc: 'AI Geo-Matching active in 150+ countries', bg: '#f0fafa' },
                { icon: '📱', title: 'Concierge Alerts', desc: 'Smart notifications, never annoying fraud blocks', bg: '#f0fafa' },
              ].map((f, i) => (
                <Reveal key={i} direction="left" delay={0.15 + i * 0.1}>
                  <LightCard style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center', borderRadius: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: f.bg, border: '1px solid rgba(0,180,180,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.textDark, marginBottom: 2 }}>{f.title}</div>
                      <div style={{ color: C.textMid, fontSize: 12 }}>{f.desc}</div>
                    </div>
                  </LightCard>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <TaerasCard />
              <LightCard style={{ padding: '18px 22px', borderRadius: 16, borderLeft: `3px solid ${C.teal}`, width: 340 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: C.teal }}>Taeras · now</span>
                  <div style={{ position: 'relative', width: 8, height: 8 }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#16a34a', animation: 'pulse-ring 1.8s infinite' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', position: 'relative', zIndex: 1 }} />
                  </div>
                </div>
                <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  Vienna International detected.<br />Card optimized for € spending.
                </p>
                <div style={{ display: 'flex', gap: 24 }}>
                  {[['0%', 'FX Markup'], ['150+', 'Countries'], ['24/7', 'Protection']].map(([v, l]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ color: C.teal, fontWeight: 700, fontSize: 17, fontFamily: "'Cormorant Garamond', serif" }}>{v}</div>
                      <div style={{ color: C.textLight, fontSize: 9, letterSpacing: 1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </LightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOOKING ENGINE ── #fff ── */}
      <section style={{ background: '#fff', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 36 }}>
            <SectionLabel>Book Smarter</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, marginTop: 10, color: C.textDark }}>
              Earn on <span style={tealGrad}>every trip.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
            {[
              { route: 'Turkish Airlines · LOS → IST', detail: 'Direct · 6h 20m', yield: '5% back', icon: '✈️' },
              { route: 'Rideshare · Airport Transfer', detail: 'Lagos · 24 min ETA', yield: '3% back', icon: '🚗' },
              { route: 'Hotel · Grand Vienna', detail: '4 nights · Executive Suite', yield: '7% back', icon: '🏨' },
              { route: 'Dining · Nusr-Et Istanbul', detail: 'Reservation for 2', yield: '4% back', icon: '🍽️' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <LightCard hover style={{ padding: '18px 20px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark, marginBottom: 2 }}>{item.route}</div>
                      <div style={{ fontSize: 11, color: C.textLight }}>{item.detail}</div>
                    </div>
                  </div>
                  <div style={{
                    background: '#f0fafa', color: C.teal,
                    padding: '5px 13px', borderRadius: 20, fontSize: 12,
                    fontWeight: 700, border: `1px solid rgba(0,180,180,0.2)`,
                    whiteSpace: 'nowrap',
                  }}>{item.yield}</div>
                </LightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── #f8f9fa ── */}
      <section style={{ background: '#f8f9fa', padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel>Private Beta · 14 Countries</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, marginTop: 10, color: C.textDark }}>
              The people already <span style={tealGrad}>inside.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              { quote: "I flew Lagos to Istanbul and came back owning $47 of Apple stock. I literally did nothing.", name: 'Tunde A.', loc: 'Lagos 🇳🇬' },
              { quote: "Finally a card that doesn't punish me for spending in Euros. The yield tracker is wild.", name: 'Elif K.', loc: 'Istanbul 🇹🇷' },
              { quote: "The booking engine shows the return before you pay. I choose flights based on yield now.", name: 'Chioma N.', loc: 'London 🇬🇧' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <LightCard hover style={{ padding: '30px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: C.teal, fontSize: 44, lineHeight: 1, marginBottom: 14, fontFamily: "'Cormorant Garamond', serif" }}>"</div>
                  <p style={{ color: C.textMid, fontSize: 15, lineHeight: 1.75, fontStyle: 'italic', flex: 1, marginBottom: 24 }}>{t.quote}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.textDark }}>{t.name}</div>
                      <div style={{ color: C.textLight, fontSize: 12 }}>{t.loc}</div>
                    </div>
                    <div style={{ background: '#f0fafa', color: C.teal, fontSize: 9, letterSpacing: 1, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(0,180,180,0.2)' }}>✓ VERIFIED</div>
                  </div>
                </LightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── #fff ── */}
      <section id="faq" style={{ background: '#fff', padding: '80px 5%' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionLabel>Questions</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, marginTop: 10, color: C.textDark }}>
              Everything you <span style={tealGrad}>need to know.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}><FaqAccordion dark={false} /></Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── dark ── */}
      <section style={{
        background: 'linear-gradient(150deg, #020c14 0%, #003030 60%, #020c14 100%)',
        padding: '120px 5%', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(0,180,180,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'inline-block', background: 'rgba(0,180,180,0.1)', color: C.teal, padding: '7px 20px', borderRadius: 20, fontSize: 12, border: '1px solid rgba(0,180,180,0.25)', marginBottom: 28, letterSpacing: 1 }}>
              Private Beta
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px,5vw,62px)',
              fontWeight: 700, marginBottom: 18, lineHeight: 1.08, color: '#fff',
            }}>
              Join the Waitlist.<br />
              <span style={tealGrad}>Turn every trip into equity.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
              No credit card. No commitment. Just your spot secured.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(135deg,#00b4b4,#007a7a)',
                color: '#fff', border: 'none',
                padding: '17px 52px', borderRadius: 50,
                fontSize: 16, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'DM Sans'", letterSpacing: 0.5,
                boxShadow: '0 10px 36px rgba(0,180,180,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,180,180,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,180,180,0.4)'; }}
            >
              Join Waitlist →
            </button>
          </Reveal>
        </div>
      </section>

      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </div>
  );
}