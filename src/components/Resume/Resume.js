import portfolio from '../../data/portfolio.json';
import { getResumeData } from '../../utils/resume';
import { ExternalLink, CompanyText } from '../ui/Shared';
import Button, { BackLink } from '../ui/Button';
import DownloadResumeButton from './DownloadResumeButton';
import './Resume.css';

export function ResumeDocument({ resume }) {
  return (
    <article className="resume-document" aria-label={`${resume.name} resume`}>
      <header className="resume-document-header">
        <h1>{resume.name}</h1><p className="resume-role">{resume.role}</p>
        <p>{resume.location} <span aria-hidden="true">|</span> <a href={`mailto:${resume.email}`}>{resume.email}</a>{resume.phone && <> | {resume.phone}</>}</p>
        <div className="resume-contact-links">{resume.links.map(link => <ExternalLink key={link.label} href={link.url}>{link.label}: {link.url.replace(/^https?:\/\//, '')}</ExternalLink>)}</div>
      </header>
      <section><h2>Professional Summary</h2><p><CompanyText websites={resume.companyWebsites}>{resume.summary}</CompanyText></p></section>
      <section><h2>Technical Skills</h2>{resume.skills.map(group => <p key={group.label}><strong>{group.label}:</strong> {group.items.join(', ')}</p>)}</section>
      {resume.experience.length > 0 && <section><h2>Professional Experience</h2>{resume.experience.map(job => <div className="resume-entry" key={job.id}><h3>{job.role} | <CompanyText websites={resume.companyWebsites}>{job.company}</CompanyText></h3><p className="resume-period">{[job.period, job.location].filter(Boolean).join(' | ')}</p><ul>{(job.highlights?.length ? job.highlights : [job.description]).filter(Boolean).map(item => <li key={item}><CompanyText websites={resume.companyWebsites}>{item}</CompanyText></li>)}</ul></div>)}</section>}
      {resume.projects.length > 0 && <section><h2>Selected Projects</h2>{resume.projects.map(project => <div className="resume-entry" key={project.id}><h3>{project.title}</h3><p className="resume-period">{project.technologies.join(', ')}</p><p>{project.resumeDescription || project.description}</p>{project.githubUrl && <p className="resume-source"><ExternalLink href={project.githubUrl}>Source: {project.githubUrl}</ExternalLink></p>}</div>)}</section>}
      {resume.education.length > 0 && <section><h2>Education</h2>{resume.education.map(item => <div className="resume-entry" key={`${item.institution}-${item.subject}`}><h3>{item.subject}</h3><p>{[item.institution, item.period].filter(Boolean).join(' | ')}</p>{item.detail && <p>{item.detail}</p>}</div>)}</section>}
      {resume.certifications?.length > 0 && <section><h2>Certifications</h2><ul>{resume.certifications.map(item => <li key={item.title}><strong>{item.title}</strong> | <CompanyText websites={resume.companyWebsites}>{item.issuer}</CompanyText> | {item.date}</li>)}</ul></section>}
      {resume.achievements.length > 0 && <section><h2>Achievements</h2><ul>{resume.achievements.map(item => <li key={item.id}><strong>{item.title}:</strong> {item.description}</li>)}</ul></section>}
    </article>
  );
}

export default function Resume() {
  const resume = getResumeData(portfolio);
  return <div className="resume-page container"><div className="resume-toolbar"><div><BackLink to="/#about" /><p className="eyebrow">Experience, in one place</p></div><div className="resume-toolbar-actions"><Button variant="outline" icon="print" onClick={() => window.print()}>Print resume</Button><DownloadResumeButton /></div></div><ResumeDocument resume={resume} /><p className="resume-format-note">A simple, text-based resume with standard headings and a single reading order.</p></div>;
}
