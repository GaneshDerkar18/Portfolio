import { useEffect, useRef } from 'react';
import './CursorTrail.css';

// Pointer animation writes transforms directly; movement never re-renders React.
export default function CursorTrail() {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia?.('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!element || !media) return;
    const anchors = [...element.children];
    const points = anchors.map(() => ({ x: 0, y: 0 }));
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    let surface = null;
    let destination = { x: 0, y: 0 };

    const clearSurface = () => {
      if (surface) surface.removeAttribute('data-pointer-active');
      surface = null;
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      visible = false;
      element.dataset.visible = 'false';
      element.dataset.pressed = 'false';
      clearSurface();
    };
    const animate = time => {
      const delta = Math.min((time - previousTime) || 16.67, 40) / 16.67;
      previousTime = time;
      let unsettled = false;
      // Read the surface bounds before writing styles to avoid layout thrashing.
      const bounds = surface?.getBoundingClientRect();
      points.forEach((point, index) => {
        const target = index === 0 ? destination : points[index - 1];
        const amount = 1 - Math.pow(1 - (index === 0 ? .34 : .27), delta);
        point.x += (target.x - point.x) * amount;
        point.y += (target.y - point.y) * amount;
        if (Math.abs(point.x - destination.x) + Math.abs(point.y - destination.y) > .3) unsettled = true;
        anchors[index].style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      });
      if (surface && bounds) {
        surface.style.setProperty('--pointer-x', `${destination.x - bounds.left}px`);
        surface.style.setProperty('--pointer-y', `${destination.y - bounds.top}px`);
        surface.dataset.pointerActive = 'true';
      }
      element.dataset.idle = String(!unsettled);
      frame = unsettled ? requestAnimationFrame(animate) : 0;
      if (!unsettled) previousTime = 0;
    };
    const move = event => {
      if (!media.matches || document.hidden || (event.pointerType && event.pointerType !== 'mouse')) { hide(); return; }
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable="true"], iframe')) { hide(); return; }
      destination = { x: event.clientX, y: event.clientY };
      const nextSurface = target?.closest('[data-pointer-surface]') || null;
      if (nextSurface !== surface) { clearSurface(); surface = nextSurface; }
      element.dataset.interactive = String(Boolean(target?.closest('a, button, [role="button"]')));
      element.dataset.idle = 'false';
      if (!visible) {
        points.forEach(point => { point.x = destination.x; point.y = destination.y; });
        visible = true;
      }
      element.dataset.visible = 'true';
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const press = () => { if (visible) element.dataset.pressed = 'true'; };
    const release = () => { element.dataset.pressed = 'false'; };
    const key = event => { if (event.key === 'Tab') hide(); };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const events = [
      [document, 'pointermove', move], [document, 'pointerout', leave],
      [document, 'pointerdown', press], [document, 'pointerup', release],
      [document, 'pointercancel', hide], [document, 'visibilitychange', hide],
      [document, 'keydown', key], [window, 'blur', hide], [window, 'scroll', hide],
    ];
    let listening = false;
    const configure = () => {
      hide();
      if (listening) events.forEach(([node, name, handler]) => node.removeEventListener(name, handler));
      listening = media.matches;
      if (listening) events.forEach(([node, name, handler]) => node.addEventListener(name, handler, { passive: true }));
    };
    configure();
    media.addEventListener?.('change', configure);
    return () => {
      hide();
      events.forEach(([node, name, handler]) => node.removeEventListener(name, handler));
      media.removeEventListener?.('change', configure);
    };
  }, []);
  return <div ref={root} className="cursor-trail" aria-hidden="true" data-visible="false"><span className="cursor-anchor"><span className="cursor-ring" /></span><span className="cursor-anchor"><span className="cursor-mote" /></span><span className="cursor-anchor"><span className="cursor-mote cursor-mote-last" /></span></div>;
}
