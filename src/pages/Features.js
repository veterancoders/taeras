import { useState } from 'react';
import { C, SectionLabel, LightCard, Reveal, tealGrad, PageHero, YieldCalculator, WaitlistModal } from '../components/UI';
import TaerasCard from '../components/TaerasCard';

const GROUPS = [
  { group:'Equity Rewards', icon:'📈', color:C.teal, features:[
    {title:'Fractional Share Earning',desc:'Every swipe earns real fractional shares of AAPL, MSFT, or SPY — automatically.'},
    {title:'Commission Capture',desc:'Travel commissions routed 100% to your portfolio, not a bank\'s pocket.'},
    {title:'Auto-Portfolio Optimization',desc:'AI-driven allocation balances your shares based on travel patterns.'},
    {title:'Compounding Growth',desc:'Dividends reinvested automatically. Your travel history becomes a compounding asset.'},
  ]},
  { group:'Global Card', icon:'💳', color:'#3b82f6', features:[
    {title:'0% FX Markup',desc:'Spend internationally at the true exchange rate with zero foreign transaction fees.'},
    {title:'150+ Countries',desc:'Visa/Mastercard networks across 50M+ merchants worldwide.'},
    {title:'AI Geo-Matching',desc:'Instant location detection on landing. Card auto-optimizes for local currency.'},
    {title:'Concierge Alerts',desc:'Smart notifications — not annoying fraud blocks.'},
  ]},
  { group:'Multi-Wallet', icon:'💰', color:'#16a34a', features:[
    {title:'NGN, USD, EUR Wallets',desc:'Hold and spend in Naira, Dollars, and Euros. Switch instantly with zero delays.'},
    {title:'AI Yield Forecasting',desc:'Before your next trip, Taeras tells you how much yield covers your travel cost.'},
    {title:'Real-time Balance Sync',desc:'All wallets update in real time across all spending.'},
    {title:'Cross-currency Transfers',desc:'Move between wallets at interbank rates. No hidden spreads.'},
  ]},
  { group:'Booking Engine', icon:'✈️', color:'#7c3aed', features:[
    {title:'In-App Flight Search',desc:'Search and book flights without leaving Taeras. See yield before you pay.'},
    {title:'Hotel Booking',desc:'Browse and reserve hotels with yield-return previews.'},
    {title:'Yield-First Results',desc:'Taeras reranks results by equity return so you see the most rewarding options.'},
    {title:'One-Click Booking',desc:'Stored details, instant confirmations, equity earned the moment you confirm.'},
  ]},
];

export default function Features() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ background:'#fff' }}>
      <PageHero label="Platform Features" title={<>Everything you need<br /><span style={tealGrad}>to own every trip.</span></>} subtitle="Four pillars: equity rewards, a global card, multi-currency wallets, and a built-in booking engine. All connected. All automatic." />

      {/* Tabs */}
      <section style={{ background:'#fff', padding:'0 5% 100px', maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', gap:8, marginBottom:48, flexWrap:'wrap', justifyContent:'center' }}>
          {GROUPS.map((g,i) => (
            <button key={i} onClick={() => setActiveGroup(i)} style={{ display:'flex', alignItems:'center', gap:8, background:activeGroup===i?g.color:'#f8f9fa', color:activeGroup===i?'#fff':C.textMid, border:activeGroup===i?'none':'1px solid #e9ecef', padding:'11px 22px', borderRadius:50, fontSize:13, fontWeight:activeGroup===i?700:400, cursor:'pointer', fontFamily:"'DM Sans'", transition:'all 0.3s', boxShadow:activeGroup===i?`0 4px 16px ${g.color}40`:'none' }}>
              <span>{g.icon}</span> {g.group}
            </button>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:16 }}>
          {GROUPS[activeGroup].features.map((f,i) => (
            <Reveal key={`${activeGroup}-${i}`} delay={i*0.1}>
              <LightCard hover style={{ padding:'28px 24px', height:'100%' }}>
                <div style={{ width:40, height:40, borderRadius:12, background:`${GROUPS[activeGroup].color}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, fontSize:20 }}>{GROUPS[activeGroup].icon}</div>
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:10, color:C.textDark, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ color:C.textMid, fontSize:13, lineHeight:1.7 }}>{f.desc}</p>
                <div style={{ marginTop:16, height:2, width:32, background:GROUPS[activeGroup].color, borderRadius:1 }} />
              </LightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ background:'#f8f9fa', padding:'80px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:44 }}>
            <SectionLabel>Why Taeras Wins</SectionLabel>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:700, marginTop:8, color:C.textDark }}>Not a loyalty program.<br /><span style={tealGrad}>An ownership engine.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ overflowX:'auto', background:'#fff', borderRadius:20, border:'1px solid #e9ecef', overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.04)' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:560 }}>
                <thead>
                  <tr style={{ background:'#f8f9fa' }}>
                    <th style={{ padding:'14px 20px', textAlign:'left', color:C.textLight, fontSize:11, letterSpacing:2, fontWeight:500, borderBottom:'1px solid #e9ecef' }}>FEATURE</th>
                    <th style={{ padding:'14px 20px', textAlign:'center', color:C.teal, fontSize:11, letterSpacing:2, fontWeight:700, borderBottom:'1px solid #e9ecef' }}>TAERAS</th>
                    <th style={{ padding:'14px 20px', textAlign:'center', color:C.textLight, fontSize:11, letterSpacing:2, borderBottom:'1px solid #e9ecef' }}>TRADITIONAL CARD</th>
                    <th style={{ padding:'14px 20px', textAlign:'center', color:C.textLight, fontSize:11, letterSpacing:2, borderBottom:'1px solid #e9ecef' }}>AIRLINE MILES</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Real equity ownership','✓','✗','✗'],
                    ['0% FX markup','✓','✗','✗'],
                    ['Never expires','✓','✗','✗'],
                    ['Multi-currency wallets','✓','Sometimes','✗'],
                    ['AI geo-optimization','✓','✗','✗'],
                    ['Yield before you book','✓','✗','✗'],
                    ['Transferable assets','✓','✗','✗'],
                  ].map((row,i) => (
                    <tr key={i} style={{ borderBottom:'1px solid #f5f5f5' }}>
                      <td style={{ padding:'14px 20px', fontSize:14, color:C.textDark }}>{row[0]}</td>
                      <td style={{ padding:'14px 20px', textAlign:'center', color:'#16a34a', fontWeight:700, background:'#f0fafa', fontSize:14 }}>{row[1]}</td>
                      <td style={{ padding:'14px 20px', textAlign:'center', color:row[2]==='✗'?'#ef4444':C.textMid, fontSize:14 }}>{row[2]}</td>
                      <td style={{ padding:'14px 20px', textAlign:'center', color:row[3]==='✗'?'#ef4444':C.textMid, fontSize:14 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Geo */}
      <section style={{ background:'#fff', padding:'80px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>
          <div>
            <Reveal direction="left"><SectionLabel>AI Geo-Matching</SectionLabel></Reveal>
            <Reveal direction="left" delay={0.1}><h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:700, marginTop:8, marginBottom:18, lineHeight:1.1, color:C.textDark }}>The card that knows<br /><span style={tealGrad}>where you are.</span></h2></Reveal>
            <Reveal direction="left" delay={0.2}><p style={{ color:C.textMid, lineHeight:1.8, fontSize:15, marginBottom:24 }}>Taeras's AI detects your location the moment you land and silently optimizes your card for local currency. No settings. No manual changes. Just spend — and the card adapts.</p></Reveal>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                {from:'🇳🇬 Lagos',to:'🇹🇷 Istanbul',msg:'Card optimized for ₺ spending. TRY wallet active.'},
                {from:'🇹🇷 Istanbul',to:'🇦🇹 Vienna',msg:'Card optimized for € spending. EUR wallet active.'},
                {from:'🇦🇹 Vienna',to:'🇬🇧 London',msg:'Card optimized for £ spending. GBP wallet active.'},
              ].map((trip,i) => (
                <Reveal key={i} direction="left" delay={0.2+i*0.1}>
                  <LightCard style={{ padding:'14px 18px', borderRadius:12 }}>
                    <div style={{ fontSize:11, color:C.textLight, marginBottom:4, letterSpacing:1 }}>{trip.from} → {trip.to}</div>
                    <div style={{ fontSize:13, color:C.textDark }}>{trip.msg}</div>
                  </LightCard>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal direction="right">
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
              <TaerasCard />
              <LightCard style={{ padding:'20px 22px', borderRadius:16, width:340, borderLeft:`3px solid ${C.teal}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                  <span style={{ color:C.teal, fontSize:13, fontWeight:600 }}>Taeras · just now</span>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#16a34a', alignSelf:'center' }} />
                </div>
                <p style={{ color:C.textMid, fontSize:13, lineHeight:1.55, marginBottom:14 }}>Istanbul Airport detected.<br />Card optimized for ₺ spending.</p>
                <div style={{ display:'flex', gap:20 }}>
                  {[['0%','FX'],['₺','Active'],['24/7','On']].map(([v,l]) => (
                    <div key={l}><div style={{ color:C.teal, fontWeight:700, fontSize:15, fontFamily:"'Cormorant Garamond', serif" }}>{v}</div><div style={{ color:C.textLight, fontSize:9, letterSpacing:1 }}>{l}</div></div>
                  ))}
                </div>
              </LightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ background:'#f8f9fa', padding:'80px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:44 }}>
            <SectionLabel>Yield Calculator</SectionLabel>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:700, marginTop:8, color:C.textDark }}>See what you <span style={tealGrad}>could own</span></h2>
          </Reveal>
          <YieldCalculator dark={false} />
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg,#060d1a 0%,#003d3d 100%)', padding:'100px 5%', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(0,180,180,0.18) 0%, transparent 70%)' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <Reveal><h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,50px)', fontWeight:700, marginBottom:24, color:'#fff' }}>All features. One card.<br /><span style={tealGrad}>Automatic ownership.</span></h2></Reveal>
          <Reveal delay={0.1}><button onClick={() => setShowModal(true)} style={{ background:'linear-gradient(135deg,#00b4b4,#008a8a)', color:'#fff', border:'none', padding:'16px 40px', borderRadius:50, fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:"'DM Sans'", letterSpacing:0.5, boxShadow:'0 8px 30px rgba(0,180,180,0.35)' }}>Join Waitlist →</button></Reveal>
        </div>
      </section>

      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
