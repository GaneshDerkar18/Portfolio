import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import './theme.css';
import portfolio from './data/portfolio.json';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Contact from './components/Contact/Contact';
import { Achievements, Experience, FeaturedProjects, Skills } from './components/Sections';
import CursorTrail from './components/ui/CursorTrail';
import { Footer } from './components/ui/Shared';
import NotFound from './components/ui/NotFound';

const About = lazy(() => import('./components/About/About'));
const MoreAbout = lazy(() => import('./components/About/moreabout'));
const Work = lazy(() => import('./components/MyWork/MyWork'));
const ProjectDetail = lazy(() => import('./components/MyWork/ProjectDetail'));
const Resume = lazy(() => import('./components/Resume/Resume'));

function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const project = portfolio.projects.find(item => pathname === `/projects/${item.id}`);
    const labels = { '/': portfolio.profile.role, '/about': 'About', '/projects': 'Projects', '/contact': 'Contact', '/moreabout': 'Certificates & achievements', '/resume': 'Resume' };
    const title = `${project?.title || labels[pathname] || 'Page not found'} | ${portfolio.profile.name}`;
    const description = project?.description || portfolio.site.description;
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description], ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description], ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        target?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
function Home() {
  return <><Body /><FeaturedProjects /><Skills /><Experience /><Achievements compact /><Contact /></>;
}
export default function App() {
  const basename = process.env.PUBLIC_URL ? new URL(process.env.PUBLIC_URL, window.location.origin).pathname.replace(/\/$/, '') : undefined;
  return (
    <BrowserRouter basename={basename}>
      <div id="top" className="app">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <PageEffects /><Header /><CursorTrail />
        <main id="main-content" tabIndex="-1">
          <Suspense fallback={<div className="container page-loading" role="status">Loading page…</div>}>
            <Routes>
              <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
              <Route path="/projects" element={<Work />} /><Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact standalone />} />
              <Route path="/moreabout" element={<MoreAbout />} /><Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
