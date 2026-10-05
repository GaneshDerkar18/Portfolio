import { useEffect, useRef } from 'react';

// Animate only while the spring is moving, using a stable, unrotated hit area.
export default function useHangingMotion() {
  const anchorRef = useRef(null);
  const swingRef = useRef(null);
  useEffect(() => {
    const anchor = anchorRef.current;
    const card = swingRef.current;
    const media = window.matchMedia?.('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!anchor || !card || !media) return;
    let angle = 0;
    let velocity = 0;
    let target = 0;
    let frame = 0;
    let lastTime = 0;

    const animate = time => {
      const delta = Math.min((time - lastTime) / 1000 || 1 / 60, 1 / 30);
      lastTime = time;
      velocity += ((target - angle) * 115 - velocity * 13) * delta;
      angle = Math.max(-8, Math.min(8, angle + velocity * delta));
      const settled = Math.abs(target - angle) < .006 && Math.abs(velocity) < .025;
      if (settled) { angle = target; velocity = 0; lastTime = 0; }
      card.style.setProperty('--badge-angle', `${angle.toFixed(3)}deg`);
      card.dataset.swinging = String(!settled);
      frame = settled ? 0 : requestAnimationFrame(animate);
    };
    const start = () => { if (!frame) { lastTime = 0; frame = requestAnimationFrame(animate); } };
    const move = event => {
      if (!media.matches || document.hidden || (event.pointerType && event.pointerType !== 'mouse')) return;
      const bounds = anchor.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const horizontal = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      const vertical = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      const edgeSpace = Math.max(0, Math.min(bounds.left, window.innerWidth - bounds.right));
      const swingLimit = Math.min(6, Math.max(1.2, edgeSpace / bounds.height * 35));
      target = -horizontal * swingLimit * (.55 + vertical * .45);
      start();
    };
    const leave = () => { target = 0; start(); };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      angle = velocity = target = lastTime = 0;
      card.style.removeProperty('--badge-angle');
      card.removeAttribute('data-swinging');
    };
    const events = [[anchor, 'pointermove', move], [anchor, 'pointerleave', leave], [anchor, 'pointercancel', reset], [window, 'blur', reset], [window, 'scroll', reset], [document, 'visibilitychange', reset]];
    let listening = false;
    const configure = () => {
      reset();
      if (listening) events.forEach(([node, name, handler]) => node.removeEventListener(name, handler));
      listening = media.matches;
      if (listening) events.forEach(([node, name, handler]) => node.addEventListener(name, handler, { passive: true }));
    };
    configure();
    media.addEventListener?.('change', configure);
    return () => {
      reset();
      events.forEach(([node, name, handler]) => node.removeEventListener(name, handler));
      media.removeEventListener?.('change', configure);
    };
  }, []);
  return { anchorRef, swingRef };
}
