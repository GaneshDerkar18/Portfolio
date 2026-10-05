import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import portfolio from './data/portfolio.json';

jest.mock('@formspree/react', () => ({
  useForm: jest.fn(),
  ValidationError: ({ errors }) => errors ? <p>{errors.message}</p> : null,
}));
const { useForm } = require('@formspree/react');
const submit = jest.fn();
const reset = jest.fn();

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  localStorage.clear();
  submit.mockReset().mockResolvedValue(undefined);
  useForm.mockReturnValue([{ succeeded: false, submitting: false, errors: null }, submit, reset]);
});

<<<<<<< HEAD
test('shows current profile and featured projects from shared content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(portfolio.profile.headline.join(''));
  expect(screen.getAllByText(portfolio.profile.company).length).toBeGreaterThan(0);
  for (const project of portfolio.projects.filter(item => item.featured)) {
    expect(screen.getByRole('link', { name: `Explore ${project.title}` })).toHaveAttribute('href', `/projects/${project.id}`);
  }
  expect(screen.getByRole('link', { name: /all projects/i })).toHaveTextContent(String(portfolio.projects.length));
});

test('filters by category and technology, recovers from empty results, and opens a detail route', () => {
  window.history.replaceState({}, '', '/projects');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Backend', exact: true }));
  expect(screen.getByRole('status')).toHaveTextContent('2 projects in Backend');
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Docker' } });
  expect(screen.getByRole('status')).toHaveTextContent('1 project in Backend');
=======
test('shows current profile and featured projects from shared content', async () => {
  render(<App />);
  await screen.findByRole('button', { name: 'Send message' });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(portfolio.profile.headline.join(''));
  expect(screen.getAllByText(portfolio.profile.company).length).toBeGreaterThan(0);
  for (const project of portfolio.projects.filter(item => item.featured && item.status !== 'Concept').slice(0, 3)) {
    expect(screen.getByRole('link', { name: `Explore ${project.title}` })).toHaveAttribute('href', `/projects/${project.id}`);
  }
  expect(screen.getByRole('link', { name: /^See more projects/ })).toHaveTextContent(`${portfolio.projects.filter(item => item.status !== 'Concept').length} projects`);
  expect(screen.queryByRole('heading', { name: 'My experience, ready to share.' })).not.toBeInTheDocument();
  expect(screen.queryByRole('region', { name: 'How I approach my work' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Download resume' })).toBeInTheDocument();
  expect(document.getElementById('resume')).toBeInTheDocument();
  const intro = document.getElementById('about');
  expect(within(intro).getByRole('complementary', { name: name => name.includes(portfolio.profile.name) })).toBeInTheDocument();
  expect(within(intro).queryByRole('link', { name: /Explore NetflixGPT/ })).not.toBeInTheDocument();
  for (const paragraph of portfolio.profile.bio) {
    expect(screen.getByText((_, node) => node?.tagName === 'P' && node.textContent === paragraph)).toBeInTheDocument();
  }
  for (const award of portfolio.achievements) expect(screen.getByRole('heading', { name: award.title })).toBeInTheDocument();
});

test('filters by category and technology, recovers from empty results, and opens a detail route', async () => {
  window.history.replaceState({}, '', '/projects');
  render(<App />);
  fireEvent.click(await screen.findByRole('button', { name: 'Backend', exact: true }));
  expect(screen.getByRole('status')).toHaveTextContent('1 project · 1 concept in Backend');
  expect(within(screen.getByRole('region', { name: 'Built projects' })).getByRole('link', { name: 'Explore devTender' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: 'Built projects' })).queryByRole('link', { name: 'Explore Commerce Services' })).not.toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: 'Project ideas' })).getByRole('link', { name: 'Explore Commerce Services' })).toBeInTheDocument();
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Docker' } });
  expect(screen.getByRole('status')).toHaveTextContent('1 concept in Backend');
  expect(screen.queryByRole('region', { name: 'Built projects' })).not.toBeInTheDocument();
>>>>>>> 08d3bc0 (updated ui)
  expect(screen.queryByRole('link', { name: 'Explore devTender' })).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'nonexistent tech' } });
  expect(screen.getByRole('heading', { name: 'No projects found' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
<<<<<<< HEAD
  expect(screen.getByRole('status')).toHaveTextContent(`${portfolio.projects.length} projects`);
  fireEvent.click(screen.getByRole('link', { name: 'Explore NetflixGPT' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('NetflixGPT');
  expect(screen.getByRole('link', { name: /Live demo/i })).toHaveAttribute('href', portfolio.projects[0].demoUrl);
  expect(document.title).toBe(`NetflixGPT | ${portfolio.profile.name}`);
});

test('adding a project once populates the list, category, and detail page', () => {
=======
  expect(screen.getByRole('status')).toHaveTextContent('6 projects · 3 concepts');
  fireEvent.click(screen.getByRole('link', { name: 'Explore NetflixGPT' }));
  expect(await screen.findByRole('heading', { level: 1, name: /NetflixGPT/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Live demo/i })).toHaveAttribute('href', new URL(portfolio.projects[0].demoUrl).href);
  expect(document.title).toBe(`NetflixGPT | ${portfolio.profile.name}`);
});

test('adding a project once populates the list, category, and detail page', async () => {
>>>>>>> 08d3bc0 (updated ui)
  const project = { ...portfolio.projects[0], id: 'single-source-test', title: 'Single Source Test', category: 'New category', featured: true };
  portfolio.projects.push(project);
  try {
    window.history.replaceState({}, '', '/projects');
    render(<App />);
<<<<<<< HEAD
    expect(screen.getByRole('button', { name: 'New category' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Explore Single Source Test' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
=======
    expect(await screen.findByRole('button', { name: 'New category' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Explore Single Source Test' }));
    expect(await screen.findByRole('heading', { level: 1, name: /Single Source Test/ })).toBeInTheDocument();
>>>>>>> 08d3bc0 (updated ui)
    expect(screen.getByText(project.overview)).toBeInTheDocument();
  } finally { portfolio.projects.pop(); }
});

<<<<<<< HEAD
test('keeps concepts honest and hides missing demo or source links', () => {
  window.history.replaceState({}, '', '/projects/ai-workspace');
  render(<App />);
  expect(screen.getByText(/This is a concept, not a completed implementation/)).toBeInTheDocument();
=======
test('keeps concepts honest and hides missing demo or source links', async () => {
  window.history.replaceState({}, '', '/projects/ai-workspace');
  render(<App />);
  expect(await screen.findByText(/This is a concept, not a completed implementation/)).toBeInTheDocument();
>>>>>>> 08d3bc0 (updated ui)
  expect(screen.queryByRole('link', { name: /Live demo/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Source code/i })).not.toBeInTheDocument();
});

<<<<<<< HEAD
test('about is a separate page and unknown project routes have a recovery link', () => {
  window.history.replaceState({}, '', '/about');
  const { unmount } = render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Always a learner');
  expect(screen.queryByRole('heading', { name: /Thoughtful code/ })).not.toBeInTheDocument();
=======
test('about is a separate page and unknown project routes have a recovery link', async () => {
  window.history.replaceState({}, '', '/about');
  const { unmount } = render(<App />);
  expect(await screen.findByRole('heading', { name: /Always a learner/ })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: portfolio.profile.headline.join('') })).not.toBeInTheDocument();
  for (const paragraph of portfolio.profile.bio) {
    expect(screen.getAllByText((_, node) => node?.tagName === 'P' && node.textContent === paragraph)).toHaveLength(1);
  }
>>>>>>> 08d3bc0 (updated ui)
  unmount();
  window.history.replaceState({}, '', '/projects/does-not-exist');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'This page isn’t here.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '/projects');
});

test('theme persists and mobile navigation closes with Escape or navigation', () => {
  render(<App />);
<<<<<<< HEAD
=======
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
>>>>>>> 08d3bc0 (updated ui)
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(localStorage.getItem('theme')).toBe('light');
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Projects' }));
  expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
});

<<<<<<< HEAD
=======
test('see more projects opens the collection and its back button returns to the homepage', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /^See more projects/ }));
  await screen.findByRole('heading', { level: 1, name: /Built to learn/ });
  fireEvent.click(screen.getAllByRole('link', { name: 'Back to portfolio' })[0]);
  expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(portfolio.profile.headline.join(''));
  expect(window.location.hash).toBe('#work');
});

>>>>>>> 08d3bc0 (updated ui)
test('contact handles network failure and success without sending real messages', async () => {
  window.history.replaceState({}, '', '/contact');
  submit.mockRejectedValueOnce(new Error('Offline'));
  const { rerender } = render(<App />);
<<<<<<< HEAD
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Test Person' } });
=======
  fireEvent.change(await screen.findByLabelText('Your name'), { target: { value: 'Test Person' } });
>>>>>>> 08d3bc0 (updated ui)
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('What’s on your mind?'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'A test message.' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form'));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('couldn’t be sent'));
  expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  useForm.mockReturnValue([{ succeeded: true, submitting: false, errors: null }, submit, reset]);
  rerender(<App />);
  expect(screen.getByRole('status')).toHaveTextContent('Message sent. Thank you!');
  fireEvent.click(screen.getByRole('button', { name: 'Send another message' }));
  expect(reset).toHaveBeenCalled();
});
