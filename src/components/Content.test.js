import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import Body from './Body/Body';
import { Footer, SocialLinks } from './ui/Shared';
import { Skills, Experience, FeaturedProjects } from './Sections';
import { getResumeData } from '../utils/resume';

test('one new social entry appears in every shared placement and the resume without an icon mapping', () => {
  const additions = [
    { label: 'New platform', url: 'https://example.com/ganesh' },
    { label: 'Disabled platform', url: 'https://example.com/hidden', enabled: false },
    { label: 'Unsafe platform', url: 'javascript:alert(1)' },
    { label: 'Unconfigured platform', url: '' },
  ];
  portfolio.profile.socials.push(...additions);
  try {
    render(<MemoryRouter><Body /><SocialLinks showLabels /><Footer /></MemoryRouter>);
    expect(screen.getAllByRole('link', { name: 'New platform' })).toHaveLength(3);
    for (const link of screen.getAllByRole('link', { name: 'New platform' })) {
      expect(link).toHaveAttribute('href', 'https://example.com/ganesh');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    for (const item of additions.slice(1)) expect(screen.queryByRole('link', { name: item.label })).not.toBeInTheDocument();
    expect(getResumeData(portfolio).links.some(link => link.label === 'New platform')).toBe(true);
    additions[0].showInResume = false;
    expect(getResumeData(portfolio).links.some(link => link.label === 'New platform')).toBe(false);
  } finally { portfolio.profile.socials.splice(-additions.length); }
});

test('a featured skill added once populates the skills section, technology strip, and plain-text resume', () => {
  portfolio.skillGroups[0].skills.push({ name: 'Example skill', icon: 'code', detail: 'Example use', featured: true });
  try {
    const { container } = render(<MemoryRouter><Body /><Skills /></MemoryRouter>);
    expect(within(screen.getByRole('list', { name: 'Featured technologies' })).getByText('Example skill')).toBeInTheDocument();
    expect(within(container.querySelector('#skills')).getByText('Example skill')).toBeInTheDocument();
    expect(getResumeData(portfolio).skills[0].items).toContain('Example skill');
    expect(getResumeData(portfolio).skills.every(group => group.items.every(item => typeof item === 'string'))).toBe(true);
  } finally { portfolio.skillGroups[0].skills.pop(); }
});

test('Endava promotions have distinct titles and supplied start dates on the site and resume', () => {
  render(<MemoryRouter><Experience /></MemoryRouter>);
  const employer = screen.getByRole('heading', { name: 'Endava' }).closest('article');
  expect(within(employer).getByRole('heading', { name: 'Developer', exact: true })).toBeInTheDocument();
  expect(within(employer).getByRole('heading', { name: 'Associate Developer', exact: true })).toBeInTheDocument();
  expect(within(employer).getByRole('heading', { name: 'Developer Intern', exact: true })).toBeInTheDocument();
  const jobs = getResumeData(portfolio).experience.filter(job => job.company === 'Endava');
  expect(jobs.map(job => job.startDate)).toEqual(['2026-08', '2025-08', '2025-01']);
  for (const job of jobs) expect(within(employer).getByText(job.period)).toBeInTheDocument();
});

test('homepage keeps three featured projects and never promotes a concept as built work', () => {
  const concept = portfolio.projects.find(project => project.status === 'Concept');
  const originalFeatured = concept.featured;
  const additional = { ...portfolio.projects[0], id: 'another-project', title: 'Another project', featured: true };
  concept.featured = true;
  portfolio.projects.unshift({ ...concept, id: 'featured-concept', title: 'Featured concept' });
  portfolio.projects.push(additional);
  try {
    render(<MemoryRouter><FeaturedProjects /></MemoryRouter>);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.queryByRole('link', { name: 'Explore Featured concept' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Explore Another project' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^See more projects/ })).toHaveTextContent('7 projects');
  } finally {
    portfolio.projects.shift();
    portfolio.projects.pop();
    concept.featured = originalFeatured;
  }
});

