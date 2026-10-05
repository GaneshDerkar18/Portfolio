<<<<<<< HEAD
import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import { ExternalLink, SocialLinks } from '../ui/Shared';

export default function Body() {
  const { profile, featuredStack } = portfolio;
  return <><section className="hero container" aria-labelledby="hero-title">
    <div className="hero-content"><p className="eyebrow hero-eyebrow"><span className="short-line" />{profile.role}</p><h1 id="hero-title">{profile.headline[0]}<br /><span>{profile.headline[1]}</span></h1><p className="hero-intro">{profile.intro}</p><div className="hero-actions"><Link to="/projects" className="button button-primary">Explore my work <Icon name="right" size={18} /></Link><ExternalLink href={profile.resumeUrl} className="button button-outline"><Icon name="download" size={18} /> View résumé</ExternalLink></div><div className="hero-socials"><SocialLinks /><span className="social-divider" /><span className="location"><Icon name="pin" size={15} />{profile.location}</span></div></div>
    <aside className="developer-card" aria-label="Developer profile"><div className="developer-card-top"><span className="mono">developer.profile</span><Icon name="code" size={19} /></div><div className="developer-card-main"><div className="profile-monogram" aria-hidden="true">{profile.initials}<span>.</span></div><p className="eyebrow">The person behind the code</p><h2>{profile.name}</h2><p className="developer-role">{profile.role}</p><div className="current-role"><span className="company-symbol" aria-hidden="true">/</span><div><span className="small-label">Currently at</span><strong>{profile.company}</strong></div><span className="role-badge">Software development</span></div><div className="profile-stack">{profile.focus.map(item => <div key={item.label}><span className="small-label">{item.label}</span><strong>{item.value}</strong></div>)}</div></div><div className="developer-card-bottom"><Icon name="code" size={16} /><span>From the first component to the final endpoint.</span></div></aside>
  </section><div className="stack-strip"><div className="container stack-strip-inner"><span className="small-label">A few tools in my toolkit</span><ul>{featuredStack.map(skill => <li key={skill.name}><Icon name={skill.icon} size={23} /><span>{skill.name}</span></li>)}</ul></div></div></>;
=======
import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { SocialLinks, CompanyText } from '../ui/Shared';
import { normalizeSkill } from '../../utils/content';
import DownloadResumeButton from '../Resume/DownloadResumeButton';
import ProfileCard from './ProfileCard';
import TechnologyMarquee from '../ui/TechnologyMarquee';
import AnimatedText from '../ui/AnimatedText';
import './Hero.css';

export default function Body() {
  const { profile } = portfolio;
  const featuredStack = portfolio.skillGroups.flatMap(group => group.skills.map(normalizeSkill)).filter(skill => skill.featured);
  return (
    <>
      <section id="about" className="hero container" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span className="hello-spark" aria-hidden="true">✳</span>Hey, I’m {profile.firstName}.</p>
          <h1 id="hero-title" aria-label={profile.headline.join(' ')}>{profile.headline.map((line, index) => <span className="hero-title-line" key={index}><AnimatedText text={line} immediate accent={index === profile.headline.length - 1} delay={index * 140} /></span>)}</h1>
          <p className="hero-intro"><CompanyText>{profile.intro}</CompanyText></p>
          {profile.thought && <p className="hero-thought"><Icon name="sparkles" size={16} /><span>{profile.thought}</span></p>}
          <div id="resume" className="hero-actions"><Button to="/#work" icon="down">Explore my work</Button><DownloadResumeButton variant="outline" /></div>
          <div className="hero-socials"><SocialLinks showLabels /><Button to="/resume" variant="text" icon="arrow">View resume</Button></div>
        </div>
        <ProfileCard />
      </section>
      <TechnologyMarquee skills={featuredStack} />
    </>
  );
>>>>>>> 08d3bc0 (updated ui)
}
