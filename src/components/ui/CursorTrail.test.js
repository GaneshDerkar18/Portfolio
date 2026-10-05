import { act, fireEvent, render } from '@testing-library/react';
import CursorTrail from './CursorTrail';

const originalMatchMedia = window.matchMedia;
let media;
let changePreference;
let frames;
let nextFrame;

beforeEach(() => {
  frames = new Map();
  nextFrame = 0;
  media = { matches: true, addEventListener: jest.fn((_, handler) => { changePreference = handler; }), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => media);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.set(++nextFrame, callback); return nextFrame; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
});
afterEach(() => {
  jest.restoreAllMocks();
  window.matchMedia = originalMatchMedia;
});
function move(target, x, y) {
  const event = new Event('pointermove', { bubbles: true });
  Object.assign(event, { clientX: x, clientY: y, pointerType: 'mouse' });
  fireEvent(target, event);
}
function settle() {
  act(() => {
    for (let tick = 1; frames.size && tick < 160; tick++) {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(tick * 16.67));
    }
  });
}

test('pointer feedback settles, leaves text inputs clear, and cleans up its animation on unmount', () => {
  const { container, getByRole, unmount } = render(<><CursorTrail /><div data-pointer-surface><button>Profile link</button></div><input aria-label="Message" /></>);
  const cursor = container.querySelector('.cursor-trail');
  const surface = container.querySelector('[data-pointer-surface]');
  move(getByRole('button'), 100, 80);
  settle();
  expect(cursor).toHaveAttribute('data-visible', 'true');
  expect(cursor).toHaveAttribute('data-interactive', 'true');
  expect(surface).toHaveAttribute('data-pointer-active', 'true');
  move(getByRole('button'), 450, 250);
  settle();
  expect(frames.size).toBe(0);
  expect(cursor).toHaveAttribute('data-idle', 'true');
  move(getByRole('textbox'), 500, 260);
  expect(cursor).toHaveAttribute('data-visible', 'false');
  expect(surface).not.toHaveAttribute('data-pointer-active');
  move(getByRole('button'), 100, 100);
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
  expect(media.removeEventListener).toHaveBeenCalledWith('change', changePreference);
});

test('motion preferences disable tracking immediately and keyboard navigation hides the decoration', () => {
  media.matches = false;
  const { container, getByRole } = render(<><CursorTrail /><button>Resume</button></>);
  const cursor = container.querySelector('.cursor-trail');
  move(getByRole('button'), 100, 100);
  expect(cursor).toHaveAttribute('data-visible', 'false');
  expect(frames.size).toBe(0);
  act(() => { media.matches = true; changePreference(); });
  move(getByRole('button'), 100, 100);
  expect(cursor).toHaveAttribute('data-visible', 'true');
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(cursor).toHaveAttribute('data-visible', 'false');
  move(getByRole('button'), 120, 120);
  act(() => { media.matches = false; changePreference(); });
  expect(cursor).toHaveAttribute('data-visible', 'false');
  expect(frames.size).toBe(0);
});
