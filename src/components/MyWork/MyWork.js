<<<<<<< HEAD
import { useSearchParams } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { ProjectCard } from '../ui/Shared';
import Icon from '../ui/Icon';

export default function Work() {
  const [params, setParams] = useSearchParams();
  const categories = ['All', ...new Set(portfolio.projects.map(project => project.category))];
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All';
  const query = params.get('q') || '';
  const update = (key, value) => { const next = new URLSearchParams(params); if (!value || value === 'All') next.delete(key); else next.set(key, value); setParams(next, { replace: true }); };
  const projects = portfolio.projects.filter(project => (category === 'All' || project.category === category) && [project.title, project.description, ...project.technologies].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  return <><section className="container page-intro compact"><p className="eyebrow">The project collection</p><h1>Built to learn.<br /><span className="accent-text">Designed to be useful.</span></h1><p className="page-description">From React interfaces to backend services. Explore my existing work and a few clearly marked ideas for what comes next.</p></section><section className="container projects-section" aria-label="Project collection"><div className="project-controls"><div className="filter-list" role="group" aria-label="Filter projects by category">{categories.map(item => <button key={item} type="button" className={`filter-button ${category === item ? 'selected' : ''}`} aria-pressed={category === item} onClick={() => update('category', item)}>{item}</button>)}</div><label className="search-field"><Icon name="search" size={18} /><span className="sr-only">Search projects</span><input value={query} onChange={event => update('q', event.target.value)} type="search" placeholder="Search projects or tech…" /></label></div><div className="results-label" role="status">{projects.length} {projects.length === 1 ? 'project' : 'projects'}{category !== 'All' ? ` in ${category}` : ''}</div>{projects.length ? <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div> : <div className="empty-state"><Icon name="search" size={32} /><h2>No projects found</h2><p>Try another technology, project name, or category.</p><button type="button" className="button button-outline" onClick={() => setParams({})}>Clear filters</button></div>}</section></>;
=======
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { ProjectCard, SectionHeading } from '../ui/Shared';
import Icon from '../ui/Icon';
import Button, { BackLink } from '../ui/Button';
import FormField from '../ui/FormField';
import { groupProjects, projectCountLabel } from '../../utils/content';

export default function Work() {
  const [params, setParams] = useSearchParams();
  const categories = useMemo(() => ['All', ...new Set(portfolio.projects.map(project => project.category))], []);
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All';
  const query = params.get('q') || '';
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };
  const projects = useMemo(() => portfolio.projects.filter(project =>
    (category === 'All' || project.category === category) &&
    [project.title, project.description, ...project.technologies].join(' ').toLowerCase().includes(query.trim().toLowerCase())
  ), [category, query]);
  const { work, concepts } = groupProjects(projects);
  const resultSummary = [
    work.length > 0 && projectCountLabel(work.length),
    concepts.length > 0 && projectCountLabel(concepts.length, 'concept'),
  ].filter(Boolean).join(' · ') || '0 projects';
  return (
    <>
      <section className="container page-intro compact">
        <BackLink /><p className="eyebrow">The project collection</p>
        <h1>Built to learn.<br /><span className="accent-text">Designed to be useful.</span></h1>
        <p className="page-description">Explore the demos and source code. Planned project ideas are grouped separately below.</p>
      </section>
      <section className="container projects-section" aria-label="Project collection">
        <div className="project-controls">
          <div className="filter-list" role="group" aria-label="Filter projects by category">
            {categories.map(item => <Button key={item} variant="filter" className={`filter-button ${category === item ? 'selected' : ''}`} aria-pressed={category === item} onClick={() => update('category', item)}>{item}</Button>)}
          </div>
          <div className="project-search"><Icon name="search" size={18} /><FormField label="Search projects" className="search-control" value={query} onChange={event => update('q', event.target.value)} type="search" placeholder="Search projects or tech…" /></div>
        </div>
        <div className="results-label" role="status">{resultSummary}{category !== 'All' ? ` in ${category}` : ''}</div>
        {work.length > 0 && <div className="project-grid" role="region" aria-label="Built projects">{work.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>}
        {concepts.length > 0 && <section className="section" aria-label="Project ideas"><SectionHeading eyebrow="On the drawing board" title="Project ideas" description="Planned explorations. These describe the intended scope, not completed features." /><div className="project-grid">{concepts.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></section>}
        {projects.length === 0 && <div className="empty-state"><Icon name="search" size={32} /><h2>No projects found</h2><p>Try another technology, project name, or category.</p><Button variant="outline" onClick={() => setParams({})}>Clear filters</Button></div>}
        <div className="project-list-bottom"><BackLink /></div>
      </section>
    </>
  );
>>>>>>> 08d3bc0 (updated ui)
}
