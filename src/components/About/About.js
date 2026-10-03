import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import { ExternalLink, SocialLinks } from '../ui/Shared';
import { Achievements, Experience } from '../Sections';

export default function About() {
  return <><section className="container page-intro about-intro"><div><p className="eyebrow">A little about me</p><h1>A developer.<br />A problem solver.<br /><span className="accent-text">Always a learner.</span></h1><div className="hero-actions"><ExternalLink href={portfolio.profile.resumeUrl} className="button button-primary">View résumé <Icon name="arrow" size={18} /></ExternalLink><SocialLinks /></div></div><div className="about-copy"><p className="about-greeting">Hi, I’m {portfolio.profile.firstName}.</p>{portfolio.profile.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="section-tinted"><div className="container principles-grid">{portfolio.principles.map(item => <article key={item.number}><span className="mono accent-text">{item.number} /</span><h2>{item.title}</h2><p>{item.description}</p></article>)}</div></section><Experience /><Achievements /></>;
}
