import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
<<<<<<< HEAD
import Icon from './Icon';

export const assetUrl = path => path?.startsWith('/') ? `${process.env.PUBLIC_URL || ''}${path}` : path;
export const isWebUrl = url => /^https?:\/\//i.test(url || '');

export function ExternalLink({ href, children, ...props }) {
  if (!isWebUrl(href)) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}
export function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{action}</div>;
=======
import { safeHref, assetUrl } from '../../utils/links';
import Icon from './Icon';
import Button from './Button';
import AnimatedText from './AnimatedText';
import { getSocialLinks, normalizeSkill, getCompanySegments, isProjectConcept } from '../../utils/content';
import './Projects.css';
export { assetUrl };
export const isWebUrl = url => /^https?:/.test(safeHref(url) || '');

export function ExternalLink({ href, children, ...props }) {
  const safe = safeHref(href);
  if (!safe || !/^https?:/.test(safe)) return null;
  return <a href={safe} {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
}
export function CompanyText({ children, websites = portfolio.companyWebsites }) {
  return getCompanySegments(children, websites).map((part, index) => part.href
    ? <ExternalLink key={index} href={part.href} className="company-link">{part.text}</ExternalLink>
    : part.text);
}
export function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><AnimatedText as="h2" text={title} />{description && <p className="section-description">{description}</p>}</div>{action}</div>;
>>>>>>> 08d3bc0 (updated ui)
}
export function Tags({ items }) {
  return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function SocialLinks({ showLabels = false }) {
<<<<<<< HEAD
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
=======
  return <div className="social-links">{getSocialLinks(portfolio.profile).map(social => <ExternalLink href={social.url} key={social.label} aria-label={social.label} title={social.label} className={showLabels ? 'social-link with-label' : 'social-link'}>{assetUrl(social.iconUrl) ? <img src={assetUrl(social.iconUrl)} alt="" width="19" height="19" /> : <Icon name={social.icon || 'globe'} size={19} />}{showLabels && <span>{social.label}</span>}</ExternalLink>)}</div>;
}
export function SkillSymbol({ skill, size = 24 }) {
  const item = normalizeSkill(skill);
  return item.mark ? <span className="skill-mark" aria-hidden="true">{item.mark}</span> : <Icon name={item.icon || 'code'} size={size} />;
}
export function ProjectHighlights({ items, className = '' }) {
  if (!items?.length) return null;
  return <ul className={`project-highlights ${className}`}>{items.map(item => <li key={item}><Icon name="check" size={16} /><span>{item}</span></li>)}</ul>;
}
export function ProjectVisual({ project, large = false, priority = false }) {
  const image = assetUrl(project.image);
  const knownSkills = image ? [] : portfolio.skillGroups.flatMap(group => group.skills.map(normalizeSkill));
  const cropTop = Math.max(0, Math.min(30, Number(project.imageCrop?.top) || 0));
  const cropBottom = Math.max(0, Math.min(30, Number(project.imageCrop?.bottom) || 0));
  const imageStyle = { height: `${100 / (1 - (cropTop + cropBottom) / 100)}%`, transform: `translateY(-${cropTop}%)` };
  return (
    <div className={`project-visual accent-${project.accent || 'blue'} ${large ? 'large' : ''} ${image ? '' : 'is-typographic'}`}>
      {image ? <div className="project-browser"><div className="project-browser-bar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>{project.title}</span><Icon name="arrow" size={11} /></div><div className="project-browser-screen"><img src={image} style={imageStyle} alt={`${project.title} application screenshot`} loading={priority ? 'eager' : 'lazy'} decoding="async" width="1000" height="600" /></div></div> : (
        <div className="project-typography">
          <span className="project-symbol"><Icon name={project.icon} size={32} /></span>
          <span className="project-visual-title">{project.title}<span>.</span></span>
          <span className="project-visual-subtitle">{project.subtitle}</span>
          <div className="project-stack-art" aria-label="Project stack">{project.technologies.slice(0, 3).map((technology, index) => <span className="project-stack-node" key={technology}><span className="mono" aria-hidden="true">0{index + 1}</span><SkillSymbol skill={knownSkills.find(skill => skill.name === technology) || technology} size={25} /><strong>{technology}</strong></span>)}</div>
        </div>
      )}
      {isProjectConcept(project) && <span className="concept-badge">Project concept</span>}
    </div>
  );
}
export function ProjectCard({ project, index = 0 }) {
  return (
    <article className="project-card">
      <Link to={`/projects/${project.id}`} className="project-image-link" aria-label={`Explore ${project.title}`}><ProjectVisual project={project} /></Link>
      <div className="project-card-body">
        <div className="project-meta"><span>{project.category}</span><span className="mono">{String(index + 1).padStart(2, '0')}</span></div>
        <h3><Link to={`/projects/${project.id}`}>{project.title}<Icon name="arrow" /></Link></h3>
        <p>{project.description}</p>
        <Tags items={project.technologies.slice(0, 3)} />
        <div className="project-links">
          <Button to={`/projects/${project.id}`} variant="text">Details</Button>
          <div className="project-direct-links">
            {project.demoUrl && <Button href={project.demoUrl} variant="text" icon="arrow" aria-label={`${project.title} live demo`}>Demo</Button>}
            {project.githubUrl && <Button href={project.githubUrl} variant="text" aria-label={`${project.title} source on GitHub`}><Icon name="github" size={17} />Code</Button>}
          </div>
        </div>
      </div>
    </article>
  );
}
export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div className="footer-identity"><Link to="/" className="brand"><span className="brand-mark">{portfolio.profile.initials}<span>.</span></span><span>{portfolio.profile.name}</span></Link><p>© {new Date().getFullYear()} · {portfolio.site.footerNote}</p></div><SocialLinks /><a className="text-link" href="#top">Back to top <Icon name="arrow" size={16} /></a></div></footer>;
>>>>>>> 08d3bc0 (updated ui)
}
