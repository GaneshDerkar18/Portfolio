import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header/Header';
import TechnologyMarquee from './TechnologyMarquee';
import useHangingMotion from './useHangingMotion';

function BadgeFixture() {
  const { anchorRef, swingRef } = useHangingMotion();
  return <div ref={anchorRef} data-testid="anchor"><div ref={swingRef} data-testid="card">Profile</div></div>;
}

test('the hanging card responds, settles back to its pin, and stops on reduced motion', () => {
  const original = window.matchMedia;
  const frames = new Map();
  let nextId = 0;
  let change;
  const media = { matches: true, addEventListener: jest.fn((_, callback) => { change = callback; }), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => media);
  const request = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.set(++nextId, callback); return nextId; });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
  const { getByTestId, unmount } = render(<BadgeFixture />);
  try {
    const anchor = getByTestId('anchor');
    const card = getByTestId('card');
    anchor.getBoundingClientRect = () => ({ left: 200, top: 100, right: 560, bottom: 500, width: 360, height: 400 });
    const move = () => {
      const event = new Event('pointermove', { bubbles: true });
      Object.assign(event, { clientX: 530, clientY: 460, pointerType: 'mouse' });
      fireEvent(anchor, event);
    };
    const settle = () => act(() => {
      for (let tick = 1; frames.size && tick < 240; tick++) {
        const pending = [...frames.values()];
        frames.clear();
        pending.forEach(callback => callback(tick * 16.67));
      }
    });
    move();
    settle();
    expect(parseFloat(card.style.getPropertyValue('--badge-angle'))).toBeLessThan(0);
    expect(Math.abs(parseFloat(card.style.getPropertyValue('--badge-angle')))).toBeLessThanOrEqual(6);
    expect(frames.size).toBe(0);
    fireEvent(anchor, new Event('pointerleave'));
    settle();
    expect(card.style.getPropertyValue('--badge-angle')).toBe('0.000deg');
    expect(frames.size).toBe(0);
    move();
    act(() => { media.matches = false; change(); });
    expect(frames.size).toBe(0);
    expect(card.style.getPropertyValue('--badge-angle')).toBe('');
    move();
    expect(frames.size).toBe(0);
    act(() => { media.matches = true; change(); });
    move();
    unmount();
    expect(frames.size).toBe(0);
    expect(media.removeEventListener).toHaveBeenCalledWith('change', change);
  } finally { unmount(); window.matchMedia = original; request.mockRestore(); cancel.mockRestore(); }
});

test('the technology loop can be paused and exposes only one accessible copy of its skills', () => {
  const original = window.IntersectionObserver;
  let observeVisibility;
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn(callback => {
    observeVisibility = callback;
    return { observe: jest.fn(), disconnect };
  });
  const { unmount } = render(<TechnologyMarquee skills={[{ name: 'React', icon: 'react' }, { name: 'Docker', icon: 'docker' }]} />);
  try {
    const marquee = screen.getByRole('region', { name: 'Everyday toolkit' });
    const list = screen.getByRole('list', { name: 'Featured technologies' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('list')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Pause technology animation' }));
    expect(marquee).toHaveAttribute('data-paused', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Resume technology animation' }));
    expect(marquee).toHaveAttribute('data-paused', 'false');
    act(() => observeVisibility([{ isIntersecting: false }]));
    expect(marquee).toHaveAttribute('data-running', 'false');
    act(() => observeVisibility([{ isIntersecting: true }]));
    expect(marquee).toHaveAttribute('data-running', 'true');
    unmount();
    expect(disconnect).toHaveBeenCalled();
  } finally { unmount(); window.IntersectionObserver = original; }
});

test('the header follows the scroll threshold and exposes its open-menu state', () => {
  const initial = window.scrollY;
  const { unmount } = render(<MemoryRouter><Header /></MemoryRouter>);
  try {
    const header = screen.getByRole('banner');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 160 });
    fireEvent.scroll(window);
    expect(header).toHaveClass('is-scrolled');
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(header).toHaveAttribute('data-menu-open', 'true');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    fireEvent.scroll(window);
    expect(header).not.toHaveClass('is-scrolled');
  } finally { unmount(); Object.defineProperty(window, 'scrollY', { configurable: true, value: initial }); }
});
