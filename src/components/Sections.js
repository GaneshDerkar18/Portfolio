import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import Icon from './ui/Icon';
<<<<<<< HEAD
import { ExternalLink, ProjectCard, SectionHeading, Tags, assetUrl } from './ui/Shared';

export function FeaturedProjects() {
  const featured = portfolio.projects.filter(project => project.featured);
  return (
    <section id="work" className="section container">
      <SectionHeading
        eyebrow="01 / Selected work"
        title="Ideas, turned into experiences."
        description="A selection of projects across interfaces, services, and everything in between."
        action={<Link className="text-link" to="/projects">All projects <span className="count-badge">{portfolio.projects.length}</span><Icon name="arrow" size={18} /></Link>}
      />
      <div className="project-grid">
        {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
=======
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import AnimatedText from './ui/AnimatedText';
import { ExternalLink, ProjectCard, SectionHeading, Tags, SkillSymbol, CompanyText, assetUrl } from './ui/Shared';
import { normalizeSkill, groupExperience, groupProjects, projectCountLabel } from '../utils/content';
import './Sections.css';

export function FeaturedProjects() {
  const { work } = groupProjects(portfolio.projects);
  const featured = work.filter(project => project.featured).slice(0, 3);
  return (
    <Reveal as="section" id="work" className="section container selected-work">
      <SectionHeading
        eyebrow="01 / Selected work"
        title="A few things I’ve built."
      />
      <div className="project-grid featured-project-grid">
        {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        <Link to="/projects" className="more-projects-card" aria-label={`See more projects — ${projectCountLabel(work.length)}`}>
          <span className="more-projects-icon"><Icon name="layers" size={27} /></span>
          <div><h3>More from my workbench.</h3><p>Explore {projectCountLabel(work.length)} in the full collection.</p></div>
          <span className="more-projects-cta">See more projects<span className="more-projects-arrow"><Icon name="arrow" size={22} /></span></span>
        </Link>
      </div>
    </Reveal>
>>>>>>> 08d3bc0 (updated ui)
  );
}

export function Skills() {
  return (
    <section id="skills" className="section section-tinted">
<<<<<<< HEAD
      <div className="container">
        <SectionHeading eyebrow="02 / The toolkit" title="Across the stack. Into the details." description="The technologies and practices I use to bring an application together." />
        <div className="skills-grid">
          {portfolio.skillGroups.map(group => (
            <article className="skill-card" key={group.id}>
              <div className="skill-card-label"><span className="skill-icon"><Icon name={group.icon} size={24} /></span><span className="eyebrow">{group.label}</span></div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <Tags items={group.skills} />
            </article>
          ))}
        </div>
      </div>
=======
      <Reveal className="container">
        <SectionHeading eyebrow="02 / Technical skills" title="Tools I work with." />
        <div className="skill-rows">
          {portfolio.skillGroups.map((group, index) => {
            const skills = group.skills.map(normalizeSkill);
            const primary = skills.filter(skill => skill.detail);
            const supporting = skills.filter(skill => !skill.detail);
            return <article className="skill-row" key={group.id} aria-labelledby={`skill-${group.id}`}>
              <div className="skill-row-heading"><span className="skill-row-icon"><Icon name={group.icon} size={20} /></span><div><p className="small-label">0{index + 1} / {group.label}</p><h3 id={`skill-${group.id}`}>{group.title}</h3></div></div>
              <div className="skill-row-content"><ul className="skill-row-primary" aria-label={`${group.label} skills`}>{primary.map(skill => <li key={skill.name}><SkillSymbol skill={skill} size={21} /><div><strong>{skill.name}</strong><span>{skill.detail}</span></div></li>)}</ul>{supporting.length > 0 && <div className="skill-row-supporting"><span className="small-label">Also</span><Tags items={supporting.map(skill => skill.name)} /></div>}</div>
            </article>;
          })}
        </div>
      </Reveal>
>>>>>>> 08d3bc0 (updated ui)
    </section>
  );
}

export function Experience() {
<<<<<<< HEAD
  return (
    <section id="experience" className="section container experience-section">
      <div className="experience-intro">
        <p className="eyebrow">03 / The journey</p>
        <h2>Building software.<br /><span className="muted">Growing every day.</span></h2>
        <p>Bringing curiosity, care, and a full-stack perspective to the work.</p>
        <Link to="/about" className="text-link">A little more about me <Icon name="arrow" size={18} /></Link>
      </div>
      <div className="experience-list">
        {portfolio.experience.map(job => (
          <article className="experience-card" key={job.id}>
            <div className="experience-top">
              <div className="company-lockup"><span className="company-symbol" aria-hidden="true">/</span><h3>{job.current ? portfolio.profile.company : job.company}</h3></div>
              <span className="period">{job.period}</span>
            </div>
            <h4>{job.current ? portfolio.profile.role : job.role}</h4>
            <p>{job.description}</p>
            <ul className="experience-highlights">{job.highlights.map(item => <li key={item}>{item}</li>)}</ul>
            <Tags items={job.skills} />
=======
  const employers = groupExperience(portfolio.experience);
  return (
    <Reveal as="section" id="experience" className="section container experience-section">
      <div className="experience-intro">
        <p className="eyebrow">03 / The journey</p>
        <h2><AnimatedText text="The experience" /><br /><AnimatedText text="behind the work." className="muted" delay={120} /></h2>
        {portfolio.profile.bio.map(paragraph => <p key={paragraph}><CompanyText>{paragraph}</CompanyText></p>)}
        <Button to="/#contact" variant="text" icon="arrow">Let’s talk</Button>
      </div>
      <div className="experience-list">
        {employers.map(employer => (
          <article className="employer-card" key={employer.roles[0].id}>
            <div className="employer-heading"><h3><CompanyText>{employer.company}</CompanyText></h3>{employer.roles.some(job => job.current) && <span className="current-badge"><span />Current company</span>}</div>
            <ol className="career-timeline">{employer.roles.map(job => <li key={job.id} className={job.current ? 'is-current' : ''}><div className="career-title"><h4>{job.role}</h4><span>{job.period}</span></div><p><CompanyText>{job.description}</CompanyText></p>{job.skills?.length > 0 && <Tags items={job.skills} />}</li>)}</ol>
>>>>>>> 08d3bc0 (updated ui)
          </article>
        ))}
        <div className="education">
          <span className="skill-icon"><Icon name="book" size={20} /></span>
<<<<<<< HEAD
          <div><span className="small-label">Education</span><h3>{portfolio.education.subject}</h3><p>{portfolio.education.institution}</p></div>
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="section container">
      <SectionHeading eyebrow="Beyond the code" title="Learning along the way." action={<ExternalLink className="text-link" href={portfolio.certificatesUrl}>All certificates <Icon name="arrow" size={17} /></ExternalLink>} />
      <div className="achievement-grid">
        {portfolio.achievements.map(item => (
          <a className="achievement-card" href={assetUrl(item.url)} key={item.id} target="_blank" rel="noopener noreferrer">
            <div className="certificate-image"><img src={assetUrl(item.image)} alt={item.title} loading="lazy" width="600" height="400" /></div>
=======
          <div><span className="small-label">Education · {portfolio.education.period}</span><h3>{portfolio.education.subject}</h3><p>{portfolio.education.institution}</p><p>{portfolio.education.detail}</p></div>
        </div>
        {portfolio.certifications?.length > 0 && <div className="certifications"><p className="small-label">Certifications</p>{portfolio.certifications.map(item => <div key={item.title}><Icon name="check" size={17} /><div><strong>{item.title}</strong><span><CompanyText>{item.issuer}</CompanyText> · {item.date}</span></div></div>)}</div>}
      </div>
    </Reveal>
  );
}

export function Achievements({ compact = false }) {
  return (
    <section className={`section container ${compact ? 'recognition-section' : ''}`}>
      <SectionHeading eyebrow="Beyond the code" title="A few milestones." action={<ExternalLink className="text-link" href={portfolio.certificatesUrl}>All certificates <Icon name="arrow" size={17} /></ExternalLink>} />
      <div className={`achievement-grid ${compact ? 'recognition-grid' : ''}`}>
        {portfolio.achievements.map(item => (
          <a className="achievement-card" href={assetUrl(item.url)} key={item.id} target="_blank" rel="noopener noreferrer">
            {compact ? <span className="recognition-icon"><Icon name="sparkles" size={20} /></span> : <div className="certificate-image"><img src={assetUrl(item.image)} alt={item.title} loading="lazy" width="600" height="400" /></div>}
>>>>>>> 08d3bc0 (updated ui)
            <div><h3>{item.title}<Icon name="arrow" size={18} /></h3><p>{item.description}</p></div>
          </a>
        ))}
      </div>
    </section>
  );
}
