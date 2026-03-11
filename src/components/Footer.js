import { Link } from 'react-router-dom';
import { C } from './UI';

export default function Footer() {
  return (
    <footer style={{ background: '#0a1628', color: '#fff', paddingTop: 60, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <img src="/taeraslogo.svg" alt="Taeras" style={{ height: 40, marginBottom: 12, filter: 'brightness(0) invert(1)' }} />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>The world's first travel-equity platform. Every trip becomes ownership.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['Ln'].map(s => (
                <div key={s} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(0,180,180,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.teal; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,180,180,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: C.teal, fontSize: 11, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>PRODUCT</div>
            {[{label:'How it Works',path:'/how-it-works'},{label:'Features',path:'/features'},{label:'Calculator',path:'/#calculator'},{label:'FAQ',path:'/#faq'}].map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <Link to={l.path} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = C.teal}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                >{l.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.teal, fontSize: 11, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>COMPANY</div>
            {[{label:'About Us',path:'/about'},{label:'Contact',path:'/contact'},/* {label:'Careers',path:'/contact'},{label:'Press',path:'/contact'} */].map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <Link to={l.path} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = C.teal}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                >{l.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.teal, fontSize: 11, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>JOIN THE MOVEMENT</div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>Get early access updates and travel-equity insights.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input type="email" placeholder="your@email.com" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,180,180,0.2)', color: '#fff', padding: '11px 14px', borderRadius: 10, fontSize: 13, fontFamily: "'DM Sans'", outline: 'none', width: '100%' }} />
              <button style={{ background: 'linear-gradient(135deg,#00b4b4,#008a8a)', color: '#fff', border: 'none', padding: '11px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans'" }}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.51)', fontSize: 11, lineHeight: 1.85, maxWidth: 1100 }}>
            <strong style={{ color: 'rgba(255, 255, 255, 0.58)' }}>Disclaimer:</strong> Taeras is a financial technology company, not a bank. Banking services and card issuance are provided by our licensed partner institutions. Investment accounts and fractional share trading are facilitated through SEC-registered and SIPC-member broker-dealers. Taeras is currently in a Private Beta phase; access is granted sequentially based on our waitlist. Past investment performance does not guarantee future results. Fractional share ownership involves risk, including possible loss of principal. Please read our full Terms of Service and Risk Disclosure before joining.
          </p>
        </div>

        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>© 2025 Taeras Technologies Ltd. All rights reserved.</p>
       {/*    <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <span key={l} style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = C.teal}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.18)'}
              >{l}</span>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
