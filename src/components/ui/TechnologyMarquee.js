import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { SkillSymbol } from './Shared';
import './TechnologyMarquee.css';

export default function TechnologyMarquee({ skills }) {
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = true;
    const update = () => { element.dataset.running = String(inView && !document.hidden); };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }) : null;
    observer?.observe(element);
    update();
    document.addEventListener('visibilitychange', update);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  if (!skills.length) return null;
  const items = skills.map(skill => <li key={skill.name}><SkillSymbol skill={skill} size={20} /><span>{skill.name}</span></li>);
  return <section ref={root} className="stack-strip technology-marquee" aria-label="Everyday toolkit" data-paused={paused}>
    <div className="container stack-strip-inner"><span className="small-label">My everyday<br />toolkit</span>
      <div className="marquee-viewport"><div className="marquee-track"><ul className="marquee-group" aria-label="Featured technologies">{items}</ul><ul className="marquee-group" aria-hidden="true">{items}</ul></div></div>
      <Button variant="icon" className="marquee-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume technology animation' : 'Pause technology animation'} aria-pressed={paused} title={paused ? 'Resume animation' : 'Pause animation'}><svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6V4Z" fill="currentColor" /> : <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}</svg></Button>
    </div>
  </section>;
}
