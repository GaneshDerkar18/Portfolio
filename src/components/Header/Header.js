import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import ThemeToggle from './ThemeToggle';
import Icon from '../ui/Icon';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 800) setOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [open]);
  return <header className="header"><div className="container header-inner">
    <Link className="brand" to="/" aria-label={`${portfolio.profile.name}, home`}><span className="brand-mark">{portfolio.profile.initials}<span>.</span></span><span className="brand-name">{portfolio.profile.name}</span></Link>
    <nav id="main-navigation" aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
      <NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/projects">Projects</NavLink><Link to="/#skills">Skills</Link><Link to="/#experience">Experience</Link><NavLink to="/contact" className="mobile-contact">Let’s talk</NavLink>
    </nav>
    <div className="header-actions"><ThemeToggle /><Link to="/contact" className="button button-small button-outline header-contact">Let’s talk <Icon name="arrow" size={16} /></Link><button className="icon-button menu-toggle" type="button" ref={toggle} onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}><Icon name={open ? 'close' : 'menu'} /></button></div>
  </div></header>;
}
