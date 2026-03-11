import { useState } from 'react';
import { C, SectionLabel, LightCard, Reveal, tealGrad, PageHero, WaitlistModal } from '../components/UI';

export default function AboutUs() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ background: '#fff' }}>
      <PageHero label="About Taeras" title={<>We built what we<br /><span style={tealGrad}>wished existed.</span></>} subtitle="Taeras was born from a simple frustration: years of loyalty, millions of miles, and nothing to show for it. We set out to fix the travel economy — permanently." />

      {/* Origin */}
      <section style={{ background: '#fff', padding: '0 5% 80px', maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{ background: '#f0fafa', border: '1px solid rgba(0,180,180,0.2)', borderLeft: `4px solid ${C.teal}`, borderRadius: '0 20px 20px 0', padding: '40px 44px', marginBottom: 40 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px,2.5vw,24px)', lineHeight: 1.8, color: C.textDark, fontStyle: 'italic' }}>"For decades, travel rewards have been built around points and miles — incentives that expire and rarely translate into lasting financial value.

              At Taeras, we believe travel should do more than move you across the world.

              It should build your future.

              The idea began with a simple realization: the travelers driving the global economy should own a piece of it.

              After building Tripcel across more than 200 destinations, we saw how much value travel generates — yet very little of that value returns to the traveler.

              During a trip from Vienna to Dubai, over $5,000 was spent on travel, yet the only reward was a few loyalty points with an expiration date.

              That moment raised a simple question:

              Why does travel generate so much value, yet return so little to the traveler?

              Taeras was built to answer that question.

              Because travel shouldn’t just be about where you go.

              It should be about what you own.
              "</p>
            <div style={{ marginTop: 18, color: C.teal, fontSize: 14, fontWeight: 600 }}>The Taeras Team - Founders & Architects</div>
          </div>
        </Reveal>
      {/*   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[{ year: '2022', event: 'Founding idea born from a Lagos → Istanbul → Vienna trip.' }, { year: '2023', event: 'First prototype built. $2M raised from African and European investors.' }, { year: '2024', event: 'Private beta launched in 4 countries. First fractional shares earned through travel.' }, { year: '2025', event: 'Expanding to 14 countries. 1,200+ beta members. $4.2M in wealth generated.' }].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <LightCard style={{ padding: '22px 20px', borderRadius: 14 }}>
                <div style={{ color: C.teal, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{item.year}</div>
                <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.65 }}>{item.event}</p>
              </LightCard>
            </Reveal>
          ))}
        </div> */}
      </section>

      {/* Mission */}
      <section style={{ background: '#f8f9fa', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 60 }}>
          {[
            { label: 'Our Mission', title: <>Make every traveler<br /><span style={tealGrad}>an investor.</span></>, text: 'Over $1.8 trillion is spent on travel annually. Almost none of that spending creates lasting wealth for the people doing the traveling. Taeras\'s mission is to close this gap — to ensure that every time someone boards a plane, they\'re building equity.' },
            { label: 'Our Vision', title: <>A world where<br /><span style={tealGrad}>travel builds wealth.</span></>, text: 'We envision a generation of global citizens who travel more freely, knowing that every trip compounds their financial future. The world\'s biggest companies will be owned, in part, by the people who power the global travel economy.' },
          ].map((s, i) => (
            <div key={i}>
              <Reveal direction={i === 0 ? 'left' : 'right'}><SectionLabel>{s.label}</SectionLabel></Reveal>
              <Reveal direction={i === 0 ? 'left' : 'right'} delay={0.1}><h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, marginTop: 8, marginBottom: 18, lineHeight: 1.1, color: C.textDark }}>{s.title}</h2></Reveal>
              <Reveal direction={i === 0 ? 'left' : 'right'} delay={0.2}><p style={{ color: C.textMid, lineHeight: 1.8, fontSize: 15 }}>{s.text}</p></Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#fff', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionLabel>Our Values</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, marginTop: 8, color: C.textDark }}>What we <span style={tealGrad}>stand for.</span></h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 20 }}>
            {[
              { icon: '🌍', title: 'Ownership for All', desc: 'Wealth-building through investing has been for the privileged few. Taeras changes that — one trip at a time.' },
              { icon: '🔍', title: 'Radical Transparency', desc: 'No hidden fees. No silent markups. We tell you exactly how every dollar flows — from your swipe to your shares.' },
              { icon: '⚡', title: 'Relentless Automation', desc: 'Every powerful financial behavior should require zero effort. We build so you don\'t have to think about it.' },
              { icon: '🤝', title: 'Global First', desc: 'Built for travelers from Lagos, Istanbul, London, and everywhere in between. Not a US product ported globally.' },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <LightCard hover style={{ padding: '28px 22px', height: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f0fafa', border: '1px solid rgba(0,180,180,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: C.textDark }}>{v.title}</h3>
                  <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
                </LightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#060d1a 0%,#003d3d 100%)', padding: '100px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,180,180,0.18) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal><h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, marginBottom: 12, color: '#fff' }}>Join us in building<br /><span style={tealGrad}>the future of travel.</span></h2><p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontSize: 16 }}>Whether as a user, investor, or team member — we want you with us.</p></Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg,#00b4b4,#008a8a)', color: '#fff', padding: '15px 36px', borderRadius: 50, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: 0.5 }}>Join Waitlist →</button>
              <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', padding: '15px 36px', borderRadius: 50, fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans'" }}>Partner With Us</button>
            </div>
          </Reveal>
        </div>
      </section>
      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
