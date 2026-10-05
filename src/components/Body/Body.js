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
}
