import { useState } from 'react';
import { C, SectionLabel, LightCard, Reveal, tealGrad, PageHero } from '../components/UI';

const TYPES = ['Join Waitlist','Investor Relations','Media / Press','Partnerships','Careers','General Inquiry'];

export default function ContactUs() {
  const [form, setForm] = useState({ name:'', email:'', type:'Join Waitlist', country:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // Save to localStorage
    const entry = { ...form, joinedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('taeras_contacts') || '[]');
    localStorage.setItem('taeras_contacts', JSON.stringify([...existing, entry]));
    setSubmitted(true);
  };

  const inp = (field) => ({
    width:'100%', background:'#f8f9fa',
    border:`1px solid ${errors[field]?'#ef4444':'#e9ecef'}`,
    color:C.textDark, padding:'13px 16px', borderRadius:12,
    fontSize:14, fontFamily:"'DM Sans', sans-serif",
    outline:'none', transition:'border-color 0.2s',
  });

  if (submitted) return (
    <div style={{ background:'#fff', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'100px 5%', textAlign:'center' }}>
      <div>
        <div style={{ fontSize:60, marginBottom:20 }}>🎉</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(26px,4vw,50px)', fontWeight:700, color:C.textDark, marginBottom:14 }}>You're on the list.<br /><span style={tealGrad}>We'll be in touch.</span></h2>
        <p style={{ color:C.textMid, fontSize:16, maxWidth:440, margin:'0 auto 28px', lineHeight:1.7 }}>Thanks for reaching out, {form.name.split(' ')[0]}. We review every submission personally and will get back to you within 24–48 hours.</p>
        <div style={{ display:'inline-block', background:'#f0fafa', color:C.teal, padding:'10px 24px', borderRadius:20, fontSize:13, border:'1px solid rgba(0,180,180,0.2)' }}>
          Private Beta
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:'#fff' }}>
      <PageHero label="Get In Touch" title={<>Let's talk.<br /><span style={tealGrad}>We respond fast.</span></>} subtitle="Whether you want to join the waitlist, explore a partnership, or just ask a question — we're here. Real humans, real replies." />

      <section style={{ background:'#fff', padding:'0 5% 100px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, alignItems:'start' }}>

          {/* Form */}
          <Reveal direction="left">
            <LightCard style={{ padding:'40px 36px' }}>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:24, fontWeight:700, color:C.textDark, marginBottom:26 }}>Send a Message</h3>
              {/* Type */}
              <div style={{ marginBottom:18 }}>
                <label style={{ display:'block', color:C.textLight, fontSize:11, letterSpacing:1.5, marginBottom:8, fontWeight:600 }}>I'M INTERESTED IN</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {TYPES.map(type => (
                    <button key={type} onClick={() => setForm(f => ({...f,type}))} style={{ background:form.type===type?'#f0fafa':'#f8f9fa', color:form.type===type?C.teal:C.textMid, border:form.type===type?`1px solid rgba(0,180,180,0.35)`:'1px solid #e9ecef', padding:'7px 14px', borderRadius:20, fontSize:12, cursor:'pointer', fontFamily:"'DM Sans'", transition:'all 0.2s', fontWeight:form.type===type?600:400 }}>{type}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', color:C.textLight, fontSize:11, letterSpacing:1.5, marginBottom:8, fontWeight:600 }}>FULL NAME *</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})); }} style={inp('name')} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=errors.name?'#ef4444':'#e9ecef'} />
                {errors.name && <p style={{ color:'#ef4444', fontSize:11, marginTop:4 }}>{errors.name}</p>}
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', color:C.textLight, fontSize:11, letterSpacing:1.5, marginBottom:8, fontWeight:600 }}>EMAIL ADDRESS *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => { setForm(f=>({...f,email:e.target.value})); setErrors(er=>({...er,email:''})); }} style={inp('email')} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=errors.email?'#ef4444':'#e9ecef'} />
                {errors.email && <p style={{ color:'#ef4444', fontSize:11, marginTop:4 }}>{errors.email}</p>}
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', color:C.textLight, fontSize:11, letterSpacing:1.5, marginBottom:8, fontWeight:600 }}>COUNTRY</label>
                <input type="text" placeholder="Nigeria, Turkey, UK..." value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} style={inp('country')} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor='#e9ecef'} />
              </div>
              <div style={{ marginBottom:26 }}>
                <label style={{ display:'block', color:C.textLight, fontSize:11, letterSpacing:1.5, marginBottom:8, fontWeight:600 }}>MESSAGE *</label>
                <textarea placeholder="Tell us what you're looking for..." value={form.message} onChange={e=>{setForm(f=>({...f,message:e.target.value}));setErrors(er=>({...er,message:''}));}} rows={5} style={{ ...inp('message'), resize:'vertical', minHeight:120 }} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=errors.message?'#ef4444':'#e9ecef'} />
                {errors.message && <p style={{ color:'#ef4444', fontSize:11, marginTop:4 }}>{errors.message}</p>}
              </div>
              <button onClick={handleSubmit} style={{ width:'100%', background:'linear-gradient(135deg,#00b4b4,#008a8a)', color:'#fff', border:'none', padding:'16px', borderRadius:50, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans'", letterSpacing:0.5, boxShadow:'0 6px 24px rgba(0,180,180,0.3)', transition:'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 10px 32px rgba(0,180,180,0.45)';}}
                onMouseLeave={e=>{e.target.style.transform='none';e.target.style.boxShadow='0 6px 24px rgba(0,180,180,0.3)';}}>
                Send Message →
              </button>
              <p style={{ textAlign:'center', color:'#aaa', fontSize:11, marginTop:14, letterSpacing:1 }}>We reply within 24–48 hours</p>
            </LightCard>
          </Reveal>

          {/* Info */}
          <div>
            <Reveal direction="right">
              <div style={{ marginBottom:36 }}>
                <SectionLabel>Contact Info</SectionLabel>
                <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:16 }}>
                  {[{icon:'📧',label:'Email',value:'hello@taeras.com'},{icon:'💼',label:'LinkedIn',value:'https://www.linkedin.com/company/taeras/'}].map((c,i) => (
                    <div key={i} style={{ display:'flex', gap:14, alignItems:'center' }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:'#f0fafa', border:'1px solid rgba(0,180,180,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{c.icon}</div>
                      <div><div style={{ color:C.textLight, fontSize:10, letterSpacing:1.5, marginBottom:2 }}>{c.label.toUpperCase()}</div><div style={{ fontSize:14, color:C.textDark }}>{c.value}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
        
          </div>
        </div>
      </section>
    </div>
  );
}
