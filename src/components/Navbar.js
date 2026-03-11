import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WaitlistModal } from './UI';

const NAV_LINKS = [
  { label: 'How it Works', path: '/how-it-works' },
  { label: 'Features', path: '/features' },
  { label: 'About Us', path: '/about' },
  { label: 'Calculator', path: '/#calculator' },
  { label: 'FAQ', path: '/#faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || showModal) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, showModal]);

  const isHeroPage = location.pathname === '/';
  const isActive = (path) => !path.startsWith('/#') && location.pathname === path;

  const handleHashLink = (path) => {
    setMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (location.pathname !== '/') { window.location.href = path; return; }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navbar background logic
  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : isHeroPage ? 'transparent' : 'rgba(255,255,255,0.97)';
  const navBorder = scrolled || !isHeroPage ? '1px solid #e9ecef' : 'none';
  const logoColor = (!scrolled && isHeroPage) ? '#00d4d4' : '#00b4b4';
  const linkColor = (!scrolled && isHeroPage) ? 'rgba(255,255,255,0.75)' : '#4a5568';
  const linkHover = '#00b4b4';

  return (
    <>
      <style>{`
        .nav-desktop-link {
          font-size: 13px; letter-spacing: 0.5px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          padding: 4px 0; border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          text-decoration: none;
        }
        .nav-desktop-link:hover { color: #00b4b4 !important; border-bottom-color: rgba(0,180,180,0.4); }
        .nav-desktop-link.active { color: #00b4b4 !important; border-bottom-color: rgba(0,180,180,0.4); }
        .nav-waitlist-btn {
          background: linear-gradient(135deg, #00b4b4, #008a8a);
          color: #fff !important; padding: 10px 22px; border-radius: 50px;
          border: none; cursor: pointer; font-size: 13px; font-weight: 700;
          letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(0,180,180,0.3);
          transition: transform 0.2s, box-shadow 0.2s; white-space: nowrap;
          text-decoration: none; display: inline-block;
        }
        .nav-waitlist-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,180,180,0.45); }
        .hamburger-btn {
          background: none; border: 1px solid rgba(0,180,180,0.35); color: #00b4b4;
          width: 40px; height: 40px; border-radius: 8px; cursor: pointer;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 5px; padding: 8px;
          transition: background 0.2s; flex-shrink: 0;
        }
        .hamburger-btn:hover { background: rgba(0,180,180,0.08); }
        .hamburger-line {
          width: 18px; height: 2px; background: #00b4b4; border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s; transform-origin: center;
        }
        .hamburger-btn.open .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger-btn.open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger-btn.open .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          color: #4a5568; font-size: 16px; font-family: 'DM Sans', sans-serif;
          font-weight: 500; padding: 15px 0;
          border-bottom: 1px solid #f0f0f0; cursor: pointer;
          transition: color 0.2s; text-decoration: none;
        }
        .mobile-nav-link:hover { color: #00b4b4; }
        .mobile-nav-link.active { color: #00b4b4; }
        .desktop-nav-wrap { display: flex !important; }
        .mobile-nav-btn { display: none !important; }
        .mobile-drawer { display: none !important; }
        .mobile-overlay-el { display: none !important; }
        @media (max-width: 900px) {
          .desktop-nav-wrap { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .mobile-drawer { display: flex !important; }
          .mobile-overlay-el { display: block !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: scrolled ? 64 : 80,
        padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: navBg,
        backdropFilter: (scrolled || !isHeroPage) ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: (scrolled || !isHeroPage) ? 'blur(20px)' : 'none',
        borderBottom: navBorder,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: (scrolled || !isHeroPage) ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
        <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: logoColor, letterSpacing: 3, textDecoration: 'none', flexShrink: 0, transition: 'color 0.3s' }}>TAERAS</Link>

        <div className="desktop-nav-wrap" style={{ gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            link.path.startsWith('/#')
              ? <span key={link.label} className="nav-desktop-link" style={{ color: linkColor }} onClick={() => handleHashLink(link.path)}>{link.label}</span>
              : <Link key={link.label} to={link.path} className={`nav-desktop-link${isActive(link.path) ? ' active' : ''}`} style={{ color: linkColor }}>{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="nav-waitlist-btn" onClick={() => setShowModal(true)}>Join Waitlist</button>
          <button className={`hamburger-btn mobile-nav-btn ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span className="hamburger-line" /><span className="hamburger-line" /><span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay-el" onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 88, backdropFilter: 'blur(4px)',
        }} />
      )}

      {/* Drawer */}
      <div className="mobile-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 99,
        width: 300,
        background: 'rgba(255,255,255,0.99)',
        borderLeft: '1px solid #e9ecef',
        padding: '80px 28px 40px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        flexDirection: 'column',
        overflowY: 'auto',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.12)',
      }}>
        {NAV_LINKS.map(link => (
          link.path.startsWith('/#')
            ? <span key={link.label} className="mobile-nav-link" onClick={() => handleHashLink(link.path)}>
                {link.label}<span style={{ color: '#00b4b4', fontSize: 18 }}>›</span>
              </span>
            : <Link key={link.label} to={link.path} className={`mobile-nav-link${isActive(link.path) ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
                {link.label}<span style={{ color: '#00b4b4', fontSize: 18 }}>›</span>
              </Link>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 28 }}>
          <button onClick={() => { setMenuOpen(false); setShowModal(true); }} style={{
            width: '100%', background: 'linear-gradient(135deg,#00b4b4,#008a8a)',
            color: '#fff', border: 'none', padding: '14px', borderRadius: 50,
            fontWeight: 700, fontSize: 14, letterSpacing: 0.5, cursor: 'pointer', fontFamily: "'DM Sans'",
          }}>Join Waitlist →</button>
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: 11, marginTop: 10, letterSpacing: 1 }}>Private Beta</p>
        </div>
      </div>

      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </>
  );
}
