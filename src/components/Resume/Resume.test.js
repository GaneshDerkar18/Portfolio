import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Resume from './Resume';
import DownloadResumeButton from './DownloadResumeButton';
import { getResumeData } from '../../utils/resume';
import { safeHref } from '../../utils/links';
import { createResumePdf } from '../../utils/resumePdf';
import portfolio from '../../data/portfolio.json';

jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));
jest.mock('../../utils/resumePdf', () => ({ createResumePdf: jest.fn() }));

test('resume uses shared JSON content, standard sections and a portfolio back link', () => {
  render(<MemoryRouter><Resume /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(portfolio.profile.name);
  expect(screen.getByRole('heading', { name: 'Professional Summary' }).parentElement).toHaveTextContent(portfolio.resume.summary);
  expect(screen.getByRole('heading', { name: 'Professional Experience' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to portfolio' })).toHaveAttribute('href', '/#about');
  expect(screen.queryByText('AI Workspace')).not.toBeInTheDocument();
});

test('edits to shared profile, experience and resume fields propagate to the export model', () => {
  const content = JSON.parse(JSON.stringify(portfolio));
  content.profile.role = 'Updated role';
  content.profile.company = 'Updated employer';
  content.experience[0].role = 'Updated job title';
  content.experience[0].company = 'Updated employer';
  content.resume.summary = 'Updated summary';
  content.resume.projectIds.push('ai-workspace');
  const resume = getResumeData(content);
  expect(resume.role).toBe('Updated role');
  expect(resume.experience[0].company).toBe('Updated employer');
  expect(resume.experience[0].role).toBe('Updated job title');
  expect(resume.summary).toBe('Updated summary');
  expect(resume.projects.every(project => project.status !== 'Concept')).toBe(true);
});

test('PDF download gets the shared model and exposes failures with a retry', async () => {
  const save = jest.fn().mockResolvedValue(undefined);
  createResumePdf.mockImplementationOnce(() => { throw new Error('Download failed'); }).mockReturnValue({ save });
  render(<MemoryRouter><DownloadResumeButton /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Download resume' }));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('couldn’t start'));
  fireEvent.click(screen.getByRole('button', { name: 'Download resume' }));
  await waitFor(() => expect(save).toHaveBeenCalledWith('Ganesh-Derkar-Resume.pdf', { returnPromise: true }));
  expect(createResumePdf.mock.calls[1][0].summary).toBe(portfolio.resume.summary);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('links reject executable and protocol-relative URLs while allowing valid contact links', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', '//evil.example', '/\\evil.example', 'https://user:password@example.com']) {
    expect(safeHref(url, true)).toBeNull();
  }
  expect(safeHref('https://github.com/GaneshDerkar18')).toBe('https://github.com/GaneshDerkar18');
  expect(safeHref('/projects', true)).toBe('/projects');
  expect(safeHref('mailto:ganesh.derkar.dev@gmail.com')).toBe('mailto:ganesh.derkar.dev@gmail.com');
});
