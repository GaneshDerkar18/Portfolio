import portfolio from '../../data/portfolio.json';
import { SocialLinks, CompanyText } from '../ui/Shared';
import Button, { BackLink } from '../ui/Button';
import { Achievements, Experience } from '../Sections';

export default function About() {
  return (
    <>
      <section className="container page-intro about-intro">
        <div><BackLink to="/#about" /><p className="eyebrow">A little about me</p><h1>A developer.<br />A problem solver.<br /><span className="accent-text">Always a learner.</span></h1><div className="hero-actions"><Button to="/resume" icon="arrow">View resume</Button><SocialLinks /></div></div>
        <div className="about-copy"><p className="about-greeting">Hi, I’m {portfolio.profile.firstName}.</p><p><CompanyText>{portfolio.profile.intro}</CompanyText></p></div>
      </section>
      <Experience /><Achievements />
    </>
  );
}
