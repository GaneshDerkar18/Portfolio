import { useEffect, useRef } from 'react';
import 'animate.css/source/fading_entrances/fadeIn.css';

// One observer is shared by all reveal elements; no scroll handlers or render loop.
let observer;
function getObserver() {
  if (!observer) observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.dataset.revealed = 'true';
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.08 });
  return observer;
}

export default function Reveal({ as: Tag = 'div', children, className = '', delay = 0, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // Above-the-fold content is never hidden while waiting for an observer callback.
    if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.revealed = 'false';
    const shared = getObserver();
    shared.observe(element);
    return () => shared.unobserve(element);
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>{children}</Tag>;
}
