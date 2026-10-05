import { Fragment, useLayoutEffect, useRef } from 'react';
import './AnimatedText.css';

// All headings share one observer. Finished headings leave it immediately.
let observer;
const waiting = new Set();

function stopObserving(element) {
  if (!waiting.delete(element)) return;
  observer?.unobserve(element);
  if (waiting.size === 0) {
    observer?.disconnect();
    observer = undefined;
  }
}

function observe(element) {
  if (!observer) observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && waiting.has(target)) {
        target.dataset.textMotion = 'running';
        stopObserving(target);
      }
    });
  }, { threshold: 0.15 });
  waiting.add(element);
  observer.observe(element);
}

export default function AnimatedText({ as: Tag = 'span', text, immediate = false, accent = false, delay = 0, className = '', style, ...props }) {
  const ref = useRef(null);
  const content = String(text ?? '');

  useLayoutEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!element) return;

    const showWithoutMotion = () => {
      element.dataset.textMotion = 'static';
      stopObserving(element);
    };
    const onPreferenceChange = () => {
      if (preference.matches) showWithoutMotion();
    };

    if (preference?.matches) showWithoutMotion();
    else if (immediate) element.dataset.textMotion = 'running';
    else if ('IntersectionObserver' in window) {
      element.dataset.textMotion = 'waiting';
      observe(element);
    } else showWithoutMotion();

    preference?.addEventListener?.('change', onPreferenceChange);
    return () => {
      stopObserving(element);
      preference?.removeEventListener?.('change', onPreferenceChange);
    };
  }, [content, immediate]);

  let word = 0;
  return (
    <Tag {...props} ref={ref} className={`animated-text ${className}`} data-text-accent={accent || undefined} style={{ ...style, '--text-delay': `${Math.max(0, Math.min(500, Number(delay) || 0))}ms` }}>
      {content.split(/(\s+)/).map((part, index) => /^\s*$/.test(part)
        ? <Fragment key={index}>{part}</Fragment>
        : <span className="animated-text-word" key={index} style={{ '--word-delay': `${Math.min(word++ * 65, 325)}ms` }}>{part}</span>)}
    </Tag>
  );
}
