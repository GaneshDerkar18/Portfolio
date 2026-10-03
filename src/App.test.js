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
  expect(screen.queryByRole('link', { name: 'Explore devTender' })).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'nonexistent tech' } });
  expect(screen.getByRole('heading', { name: 'No projects found' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
  expect(screen.getByRole('status')).toHaveTextContent(`${portfolio.projects.length} projects`);
  fireEvent.click(screen.getByRole('link', { name: 'Explore NetflixGPT' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('NetflixGPT');
  expect(screen.getByRole('link', { name: /Live demo/i })).toHaveAttribute('href', portfolio.projects[0].demoUrl);
  expect(document.title).toBe(`NetflixGPT | ${portfolio.profile.name}`);
});

test('adding a project once populates the list, category, and detail page', () => {
  const project = { ...portfolio.projects[0], id: 'single-source-test', title: 'Single Source Test', category: 'New category', featured: true };
  portfolio.projects.push(project);
  try {
    window.history.replaceState({}, '', '/projects');
    render(<App />);
    expect(screen.getByRole('button', { name: 'New category' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Explore Single Source Test' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
    expect(screen.getByText(project.overview)).toBeInTheDocument();
  } finally { portfolio.projects.pop(); }
});

test('keeps concepts honest and hides missing demo or source links', () => {
  window.history.replaceState({}, '', '/projects/ai-workspace');
  render(<App />);
  expect(screen.getByText(/This is a concept, not a completed implementation/)).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Live demo/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Source code/i })).not.toBeInTheDocument();
});

test('about is a separate page and unknown project routes have a recovery link', () => {
  window.history.replaceState({}, '', '/about');
  const { unmount } = render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Always a learner');
  expect(screen.queryByRole('heading', { name: /Thoughtful code/ })).not.toBeInTheDocument();
  unmount();
  window.history.replaceState({}, '', '/projects/does-not-exist');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'This page isn’t here.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '/projects');
});

test('theme persists and mobile navigation closes with Escape or navigation', () => {
  render(<App />);
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

test('contact handles network failure and success without sending real messages', async () => {
  window.history.replaceState({}, '', '/contact');
  submit.mockRejectedValueOnce(new Error('Offline'));
  const { rerender } = render(<App />);
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Test Person' } });
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
