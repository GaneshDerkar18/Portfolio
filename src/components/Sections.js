import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import Icon from './ui/Icon';
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
  );
}

export function Skills() {
  return (
    <section id="skills" className="section section-tinted">
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
    </section>
  );
}

export function Experience() {
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
          </article>
        ))}
        <div className="education">
          <span className="skill-icon"><Icon name="book" size={20} /></span>
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
            <div><h3>{item.title}<Icon name="arrow" size={18} /></h3><p>{item.description}</p></div>
          </a>
        ))}
      </div>
    </section>
  );
}
