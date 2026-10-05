import { act, render, screen } from '@testing-library/react';
import AnimatedText from './AnimatedText';

test('word motion preserves readable heading text and starts the hero immediately', () => {
  render(<AnimatedText as="h1" text="Thoughtful code. Useful software." immediate accent />);
  const heading = screen.getByRole('heading', { level: 1, name: 'Thoughtful code. Useful software.' });
  expect(heading.textContent).toBe('Thoughtful code. Useful software.');
  expect(heading).toHaveAttribute('data-text-motion', 'running');
  expect(heading).toHaveAttribute('data-text-accent', 'true');
});

test('scroll headings share an observer, reveal once, and clean up pending observations', () => {
  const original = window.IntersectionObserver;
  let onIntersection;
  const unobserve = jest.fn();
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn(callback => {
    onIntersection = callback;
    return { observe: jest.fn(), unobserve, disconnect };
  });
  const { unmount } = render(<><AnimatedText as="h2" text="Selected work" /><AnimatedText as="h2" text="Technical skills" /></>);
  try {
    const work = screen.getByRole('heading', { name: 'Selected work' });
    const skills = screen.getByRole('heading', { name: 'Technical skills' });
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(work).toHaveAttribute('data-text-motion', 'waiting');
    act(() => onIntersection([{ target: work, isIntersecting: false }]));
    expect(work).toHaveAttribute('data-text-motion', 'waiting');
    act(() => onIntersection([{ target: work, isIntersecting: true }]));
    expect(work).toHaveAttribute('data-text-motion', 'running');
    expect(unobserve).toHaveBeenCalledWith(work);
    expect(disconnect).not.toHaveBeenCalled();
    // A stale callback must not replay an already completed entrance.
    act(() => onIntersection([{ target: work, isIntersecting: true }]));
    expect(unobserve).toHaveBeenCalledTimes(1);
    unmount();
    expect(unobserve).toHaveBeenCalledWith(skills);
    expect(disconnect).toHaveBeenCalledTimes(1);
  } finally {
    unmount();
    if (original) window.IntersectionObserver = original;
    else delete window.IntersectionObserver;
  }
});

test('reduced motion and missing observer support leave the full text visible', () => {
  const originalMedia = window.matchMedia;
  const originalObserver = window.IntersectionObserver;
  let onPreferenceChange;
  const preference = { matches: false, addEventListener: jest.fn((_, callback) => { onPreferenceChange = callback; }), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => preference);
  delete window.IntersectionObserver;
  const { rerender, unmount } = render(<AnimatedText as="h2" text="Tools I work with." />);
  try {
    expect(screen.getByRole('heading')).toHaveAttribute('data-text-motion', 'static');
    rerender(<AnimatedText as="h2" text="Tools I work with." immediate />);
    expect(screen.getByRole('heading')).toHaveAttribute('data-text-motion', 'running');
    act(() => { preference.matches = true; onPreferenceChange(); });
    expect(screen.getByRole('heading')).toHaveAttribute('data-text-motion', 'static');
    rerender(<AnimatedText as="h2" text="Updated from JSON." immediate />);
    expect(screen.getByRole('heading', { name: 'Updated from JSON.' })).toHaveAttribute('data-text-motion', 'static');
    unmount();
    expect(preference.removeEventListener).toHaveBeenCalledWith('change', onPreferenceChange);
  } finally {
    unmount();
    if (originalMedia) window.matchMedia = originalMedia;
    else delete window.matchMedia;
    if (originalObserver) window.IntersectionObserver = originalObserver;
    else delete window.IntersectionObserver;
  }
});
