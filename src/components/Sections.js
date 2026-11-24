import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import Button from './ui/Button';
import { ExternalLink, SectionHeading, CompanyText, assetUrl } from './ui/Shared';
import { normalizeSkill, groupExperience, groupProjects, projectCountLabel } from '../utils/content';
import './Sections.css';

export function FeaturedProjects() {
  const { work } = groupProjects(portfolio.projects);
  const featured = work.filter(project => project.featured).slice(0, 3);
  return (
    <section id="work" className="section container plain-section selected-work">
      <SectionHeading eyebrow="Selected work" title="Projects" />
      <div className="plain-project-list">
        {featured.map(project => <article className="plain-project" key={project.id}>
          <div className="plain-project-heading"><h3><Link to={`/projects/${project.id}`}>{project.title}</Link></h3><span>{project.category}</span></div>
          <p>{project.description}</p>
          <div className="plain-project-footer">
            <p className="plain-project-tech">{project.technologies.slice(0, 4).join(' · ')}</p>
            <div className="plain-project-links">
              {project.demoUrl && <Button href={project.demoUrl} variant="text">Live site</Button>}
              {project.githubUrl && <Button href={project.githubUrl} variant="text">Source</Button>}
              <Button to={`/projects/${project.id}`} variant="text">Details</Button>
            </div>
          </div>
        </article>)}
      </div>
      <p className="plain-more-projects">Showing three selected projects. <Link to="/projects">Browse {projectCountLabel(work.length)} in the full collection</Link>.</p>
    </section>
  );
}

export function Skills() {
  const skills = portfolio.skillGroups.flatMap(group => group.skills.map(normalizeSkill)).filter(skill => skill.featured);
  return (
    <section id="skills" className="section container plain-section">
      <SectionHeading eyebrow="Tools" title="What I work with" />
      <ul className="plain-skill-list">{skills.map(skill => <li key={skill.name}>{skill.name}</li>)}</ul>
    </section>
  );
}

export function Experience() {
  const employers = groupExperience(portfolio.experience);
  return (
    <section id="experience" className="section container plain-section">
      <SectionHeading eyebrow="Experience" title="Work and education" />
      {portfolio.profile.bio.map(paragraph => <p className="plain-bio" key={paragraph}><CompanyText>{paragraph}</CompanyText></p>)}
      <div className="plain-career-list">
        {employers.map(employer => <section className="plain-career-group" key={employer.roles[0].id}>
          <h3><CompanyText>{employer.company}</CompanyText></h3>
          {employer.roles.map(job => <article className="plain-career-row" key={job.id}>
            <p className="plain-career-date">{job.period}</p>
            <div><h4>{job.role}{job.current && <span className="plain-current">Current</span>}</h4><p>{job.description}</p></div>
          </article>)}
        </section>)}
        <article className="plain-career-row plain-education">
          <p className="plain-career-date">{portfolio.education.period}</p>
          <div><h3>{portfolio.education.subject}</h3><p>{portfolio.education.institution} · {portfolio.education.detail}</p></div>
        </article>
      </div>
      {portfolio.certifications?.length > 0 && <div className="plain-certifications"><h3>Certifications</h3><ul>{portfolio.certifications.map(item => <li key={item.title}>{item.title} <span>— {item.issuer}, {item.date}</span></li>)}</ul></div>}
    </section>
  );
}

export function Achievements() {
  return (
    <section className="section container plain-section">
      <SectionHeading eyebrow="Recognition" title="Milestones" action={<ExternalLink className="text-link" href={portfolio.certificatesUrl}>All certificates</ExternalLink>} />
      <ul className="plain-achievement-list">{portfolio.achievements.map(item => <li key={item.id}>
        <a href={assetUrl(item.url)} target="_blank" rel="noopener noreferrer">{item.title}</a>
        <span>{item.description}</span>
      </li>)}</ul>
    </section>
  );
}
