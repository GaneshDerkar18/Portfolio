import { useParams } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { ProjectCard, ProjectVisual, ProjectHighlights, SectionHeading, Tags } from '../ui/Shared';
import Icon from '../ui/Icon';
import Button, { BackLink } from '../ui/Button';
import NotFound from '../ui/NotFound';
import { isProjectConcept } from '../../utils/content';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = portfolio.projects.find(item => item.id === projectId);
  if (!project) return <NotFound />;
  const concept = isProjectConcept(project);
  const related = portfolio.projects.filter(item => item.id !== project.id && item.category === project.category && isProjectConcept(item) === concept).slice(0, 2);
  return (
    <>
      <section className="container project-detail">
        <BackLink to="/projects">All projects</BackLink>
        <div className="project-detail-header">
          <div><p className="eyebrow">{project.category} / {project.status}</p><h1>{project.title}<span className="accent-text">.</span></h1><p className="page-description">{project.description}</p></div>
          <div className="hero-actions">{project.demoUrl && <Button href={project.demoUrl} icon="arrow">Live demo</Button>}{project.githubUrl && <Button href={project.githubUrl} variant="outline"><Icon name="github" size={18} />Source code</Button>}</div>
        </div>
        <ProjectVisual project={project} large />
        <div className="project-story">
          <div><p className="eyebrow">The project</p><h2>{concept ? 'The idea' : 'Overview'}</h2><p>{project.overview}</p><h3>{concept ? 'Proposed scope' : 'Implementation highlights'}</h3><ProjectHighlights items={project.highlights} className="detail-highlights" /></div>
          <aside className="project-facts"><p className="eyebrow">At a glance</p><dl><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl><h3>Technology stack</h3><Tags items={project.technologies} /></aside>
        </div>
      </section>
      {related.length > 0 && <section className="section section-tinted"><div className="container"><SectionHeading eyebrow="Keep exploring" title="More in this space." /><div className="project-grid related-grid">{related.map((item, index) => <ProjectCard key={item.id} project={item} index={index} />)}</div></div></section>}
    </>
  );
}
