import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import ThemeToggle from './ThemeToggle';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import './Header.css';

const navigation = [
  { label: 'About', to: '/#about' },
  { label: 'Projects', to: '/#work' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Experience', to: '/#experience' },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    let previous;
    const update = () => {
      const scrolled = window.scrollY > 36;
      if (scrolled !== previous) {
        header.current?.classList.toggle('is-scrolled', scrolled);
        previous = scrolled;
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 800) setOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [open]);
  return (
    <header ref={header} className="header" data-menu-open={open}><div className="container header-inner">
      <Link className="brand" to="/" aria-label={`${portfolio.profile.name}, home`}><span className="brand-mark">{portfolio.profile.initials}<span>.</span></span><span className="brand-name">{portfolio.profile.name}</span></Link>
      <nav id="main-navigation" aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
        {navigation.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} aria-current={location.pathname + location.hash === item.to ? 'location' : undefined}>{item.label}</Link>)}
        <Link to="/resume" onClick={() => setOpen(false)} aria-current={location.pathname === '/resume' ? 'page' : undefined}>Resume</Link>
        <Link to="/#contact" className="mobile-contact" onClick={() => setOpen(false)}>Let’s talk</Link>
      </nav>
      <div className="header-actions"><ThemeToggle /><Button to="/#contact" size="small" className="header-contact" icon="arrow">Let’s talk</Button><Button variant="icon" ref={toggle} className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}><Icon name={open ? 'close' : 'menu'} /></Button></div>
    </div></header>
  );
}
