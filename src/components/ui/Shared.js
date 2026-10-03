import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import Icon from './Icon';

export const assetUrl = path => path?.startsWith('/') ? `${process.env.PUBLIC_URL || ''}${path}` : path;
export const isWebUrl = url => /^https?:\/\//i.test(url || '');

export function ExternalLink({ href, children, ...props }) {
  if (!isWebUrl(href)) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}
export function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{action}</div>;
}
export function Tags({ items }) {
  return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function SocialLinks({ showLabels = false }) {
  return <div className="social-links">{portfolio.profile.socials.map(social => <ExternalLink href={social.url} key={social.label} aria-label={social.label} className={showLabels ? 'social-link with-label' : 'social-link'}><Icon name={social.icon} size={19} />{showLabels && <span>{social.label}</span>}</ExternalLink>)}</div>;
}
export function ProjectVisual({ project, large = false }) {
  return <div className={`project-visual accent-${project.accent || 'blue'} ${large ? 'large' : ''} ${project.image ? '' : 'is-typographic'}`}>
    {project.image ? <img src={assetUrl(project.image)} alt={`${project.title} application screenshot`} loading="lazy" width="1000" height="600" /> : <div className="project-typography"><span className="project-symbol"><Icon name={project.icon} size={32} /></span><span className="project-visual-title">{project.title}<span>.</span></span><span className="project-visual-subtitle">{project.subtitle}</span><span className="project-visual-tech">{project.technologies.slice(0, 3).join(' / ')}</span></div>}
    {project.status === 'Concept' && <span className="concept-badge">Project concept</span>}
  </div>;
}
export function ProjectCard({ project, index = 0 }) {
  return <article className="project-card">
    <Link to={`/projects/${project.id}`} className="project-image-link" aria-label={`Explore ${project.title}`}><ProjectVisual project={project} /></Link>
    <div className="project-card-body"><div className="project-meta"><span>{project.category}</span><span className="mono">{String(index + 1).padStart(2, '0')}</span></div>
      <h3><Link to={`/projects/${project.id}`}>{project.title}<Icon name="arrow" /></Link></h3><p>{project.description}</p><Tags items={project.technologies.slice(0, 4)} />
      <div className="project-links"><Link to={`/projects/${project.id}`} className="text-link">View project <Icon name="right" size={17} /></Link><ExternalLink href={project.githubUrl} className="subtle-link" aria-label={`${project.title} source on GitHub`}><Icon name="github" size={18} /></ExternalLink></div>
    </div>
  </article>;
}
export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><Link to="/" className="brand"><span className="brand-mark">{portfolio.profile.initials}<span>.</span></span><span>{portfolio.profile.name}</span></Link><p>© {new Date().getFullYear()} · {portfolio.site.footerNote}</p><a className="text-link" href="#top">Back to top <Icon name="arrow" size={16} /></a></div></footer>;
}
