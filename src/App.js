import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import portfolio from './data/portfolio.json';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import About from './components/About/About';
import MoreAbout from './components/About/moreabout';
import Work from './components/MyWork/MyWork';
import ProjectDetail, { NotFound } from './components/MyWork/ProjectDetail';
import Contact from './components/Contact/Contact';
import { Experience, FeaturedProjects, Skills } from './components/Sections';
import { Footer } from './components/ui/Shared';

function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const project = portfolio.projects.find(item => pathname === `/projects/${item.id}`);
    const labels = { '/': portfolio.profile.role, '/about': 'About', '/projects': 'Projects', '/contact': 'Contact', '/moreabout': 'Certificates & achievements' };
    const title = `${project?.title || labels[pathname] || 'Page not found'} | ${portfolio.profile.name}`;
    const description = project?.description || portfolio.site.description;
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description], ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description], ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    const frame = requestAnimationFrame(() => {
      if (hash) { document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }); }
      else { window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('main-content')?.focus({ preventScroll: true }); }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
function Home() {
  return <><Body /><FeaturedProjects /><Skills /><Experience /><Contact /></>;
}
export default function App() {
  const basename = process.env.PUBLIC_URL ? new URL(process.env.PUBLIC_URL, window.location.origin).pathname.replace(/\/$/, '') : undefined;
  return <BrowserRouter basename={basename}><div id="top" className="app"><a href="#main-content" className="skip-link">Skip to content</a><PageEffects /><Header /><main id="main-content" tabIndex="-1"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Work />} /><Route path="/projects/:projectId" element={<ProjectDetail />} /><Route path="/contact" element={<Contact standalone />} /><Route path="/moreabout" element={<MoreAbout />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></div></BrowserRouter>;
}
