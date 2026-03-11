import { useState } from 'react';
import { Link } from 'react-router-dom';
import { C, SectionLabel, LightCard, Reveal, tealGrad, PageHero, WaitlistModal } from '../components/UI';
import TaerasCard from '../components/TaerasCard';

const STEPS = [
  { num:'01', icon:'💳', title:'Spend Anywhere', subtitle:'Your card, every country, any currency.', desc:'Use your Taeras card wherever you travel — flights, hotels, airport rides, restaurants, shopping. It works on Visa and Mastercard networks in 150+ countries. No setup. No thinking. Just tap and go.', details:['Accepted at 50M+ merchants worldwide','Works with Apple Pay & Google Pay','Instant transaction notifications','Zero decline on travel spend'], color:C.teal },
  { num:'02', icon:'⚡', title:'We Capture the Commission', subtitle:'The industry secret — made yours.', desc:'Every travel booking generates a backend commission — airlines, hotels, rideshares, all pay referral fees. Traditional banks pocket this silently. Taeras captures it and routes 100% of it back to you.', details:['Flights generate 2–8% commission','Hotels generate 5–15% commission','Rideshares generate 3–5% commission','All captured automatically on every swipe'], color:'#d4af37' },
  { num:'03', icon:'📈', title:'You Own the Return', subtitle:'Real stocks. Real companies. Real ownership.', desc:'That commission is instantly routed to your brokerage account and converted into fractional shares. You pick your allocation from AAPL, MSFT, or SPY — or let Taeras auto-optimize based on your travel pattern.', details:['Fractional shares from $0.001','Choose AAPL, MSFT, SPY or blend','Shares held in your regulated account','Full ownership — transfer anytime'], color:'#16a34a' },
  { num:'04', icon:'🌍', title:'Portfolio Grows Automatically', subtitle:'Investing without thinking.', desc:'Every time you swipe, your portfolio grows. Track it in real time on your Taeras dashboard. Watch your travel spending transform into a compounding equity portfolio — no effort, no trading.', details:['Real-time portfolio tracking','AI yield forecasting for upcoming trips','Monthly portfolio summaries','Compounding returns over time'], color:'#7c3aed' },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ background: '#fff' }}>
      <PageHero
        label="How Taeras Works"
        title={<>Four steps. Fully automatic.<br /><span style={tealGrad}>You just travel.</span></>}
        subtitle="Taeras captures the travel commission economy and redirects it into real equity ownership for you. Here's exactly how it works."
      >
        <button onClick={() => setShowModal(true)} style={{ display:'inline-block', background:'linear-gradient(135deg,#00b4b4,#008a8a)', color:'#fff', padding:'14px 32px', borderRadius:50, fontWeight:700, fontSize:14, letterSpacing:0.5, border:'none', cursor:'pointer', fontFamily:"'DM Sans'" }}>
          Join Waitlist →
        </button>
      </PageHero>

      {/* Step navigator */}
      <section style={{ background:'#fff', padding:'0 5% 80px', maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', gap:8, marginBottom:48, flexWrap:'wrap', justifyContent:'center' }}>
          {STEPS.map((s,i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background:active===i?s.color:'#f8f9fa', color:active===i?'#fff':C.textMid, border:active===i?'none':'1px solid #e9ecef', padding:'10px 22px', borderRadius:50, fontSize:13, fontWeight:active===i?700:400, cursor:'pointer', fontFamily:"'DM Sans'", transition:'all 0.3s', boxShadow:active===i?`0 4px 16px ${s.color}40`:'none' }}>
              {s.num} {s.title}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:40, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:22, background:`${STEPS[active].color}12`, border:`1px solid ${STEPS[active].color}30`, padding:'7px 18px', borderRadius:50 }}>
              <span style={{ color:STEPS[active].color, fontSize:12, fontWeight:600, letterSpacing:1 }}>STEP {STEPS[active].num}</span>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:700, marginBottom:10, lineHeight:1.1, color:C.textDark }}>{STEPS[active].title}</h2>
            <p style={{ color:STEPS[active].color, fontSize:15, marginBottom:18, fontWeight:500 }}>{STEPS[active].subtitle}</p>
            <p style={{ color:C.textMid, lineHeight:1.8, fontSize:15, marginBottom:26 }}>{STEPS[active].desc}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
              {STEPS[active].details.map((d,i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:STEPS[active].color, flexShrink:0 }} />
                  <span style={{ color:C.textMid, fontSize:14 }}>{d}</span>
                </div>
              ))}
            </div>
            {active < 3 && <button onClick={() => setActive(active+1)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:`1px solid rgba(0,180,180,0.3)`, color:C.teal, padding:'12px 22px', borderRadius:50, cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:"'DM Sans'", transition:'all 0.2s' }}>Next: {STEPS[active+1].title} →</button>}
          </div>
          <LightCard style={{ padding:36, textAlign:'center', minHeight:300, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <div style={{ fontSize:72, marginBottom:18 }}>{STEPS[active].icon}</div>
            <div style={{ color:STEPS[active].color, fontSize:12, letterSpacing:2, marginBottom:10, fontWeight:600 }}>STEP {STEPS[active].num} OF 04</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, marginBottom:10, color:C.textDark }}>{STEPS[active].title}</h3>
            <p style={{ color:C.textMid, fontSize:13, lineHeight:1.7 }}>{STEPS[active].subtitle}</p>
            <div style={{ display:'flex', gap:8, marginTop:22 }}>
              {STEPS.map((_,i) => <div key={i} onClick={() => setActive(i)} style={{ width:i===active?28:8, height:8, borderRadius:4, background:i===active?STEPS[active].color:'#e9ecef', transition:'all 0.3s', cursor:'pointer' }} />)}
            </div>
          </LightCard>
        </div>
      </section>

      {/* Commission breakdown */}
      <section style={{ background:'#f8f9fa', padding:'80px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>
          <div>
            <Reveal direction="left"><SectionLabel>The Commission Economy</SectionLabel></Reveal>
            <Reveal direction="left" delay={0.1}>
              <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:700, marginTop:8, marginBottom:18, lineHeight:1.1, color:C.textDark }}>The money was always there.<br /><span style={tealGrad}>Now it flows to you.</span></h2>
            </Reveal>
            <Reveal direction="left" delay={0.2}><p style={{ color:C.textMid, lineHeight:1.8, fontSize:15 }}>The global travel industry pays $120B+ annually in commissions to card networks, banks, and OTAs. Taeras sits in the middle and routes your share directly to fractional shares in your name.</p></Reveal>
          </div>
          <Reveal direction="right">
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { category:'Airlines', commission:'2–8%', color:C.teal, example:'On a $500 flight = $25 in shares' },
                { category:'Hotels', commission:'5–15%', color:'#d4af37', example:'On a $300 hotel = $22 in shares' },
                { category:'Rideshares', commission:'3–5%', color:'#16a34a', example:'On a $40 ride = $1.60 in shares' },
                { category:'Dining', commission:'2–4%', color:'#7c3aed', example:'On a $120 dinner = $3.60 in shares' },
              ].map((item,i) => (
                <LightCard key={i} style={{ padding:'16px 20px', borderRadius:14, display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                  <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                    <div style={{ width:4, height:36, borderRadius:2, background:item.color, flexShrink:0 }} />
                    <div><div style={{ fontWeight:600, fontSize:14, color:C.textDark }}>{item.category}</div><div style={{ fontSize:11, color:C.textLight }}>{item.example}</div></div>
                  </div>
                  <div style={{ color:item.color, fontWeight:700, fontSize:18, fontFamily:"'Cormorant Garamond', serif", flexShrink:0 }}>{item.commission}</div>
                </LightCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Card features */}
      <section style={{ background:'#fff', padding:'80px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:48 }}>
            <SectionLabel>The Taeras Card</SectionLabel>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:700, marginTop:8, color:C.textDark }}>One card. <span style={tealGrad}>Infinite ownership.</span></h2>
          </Reveal>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-start', gap:40, flexWrap:'wrap' }}>
            <TaerasCard />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:420 }}>
              {[
                {icon:'🌍',label:'150+ Countries',sub:'Full global coverage'},
                {icon:'💱',label:'0% FX Markup',sub:'Real exchange rates'},
                {icon:'📱',label:'AI Geo-Match',sub:'Auto-optimize on landing'},
                {icon:'🔒',label:'24/7 Protection',sub:'Real-time fraud shield'},
                {icon:'📊',label:'Live Dashboard',sub:'Portfolio in real time'},
                {icon:'🏦',label:'Financial Institute Backed',sub:'Your money is safe'},
              ].map((f,i) => (
                <LightCard key={i} style={{ padding:'16px', borderRadius:12, textAlign:'center' }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{f.icon}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.textDark, marginBottom:2 }}>{f.label}</div>
                  <div style={{ fontSize:10, color:C.textLight }}>{f.sub}</div>
                </LightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'linear-gradient(135deg,#060d1a 0%,#003d3d 100%)', padding:'100px 5%', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(0,180,180,0.2) 0%, transparent 70%)' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <Reveal><h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(28px,4vw,50px)', fontWeight:700, marginBottom:24, color:'#fff' }}>Ready to turn your travel<br />into <span style={tealGrad}>real ownership?</span></h2></Reveal>
          <Reveal delay={0.15}><button onClick={() => setShowModal(true)} style={{ background:'linear-gradient(135deg,#00b4b4,#008a8a)', color:'#fff', border:'none', padding:'16px 40px', borderRadius:50, fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:"'DM Sans'", letterSpacing:0.5, boxShadow:'0 8px 30px rgba(0,180,180,0.35)' }}>Join Waitlist →</button></Reveal>
        </div>
      </section>

      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
