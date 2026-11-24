import portfolio from '../../data/portfolio.json';
import Button from '../ui/Button';
import { SocialLinks } from '../ui/Shared';
import DownloadResumeButton from '../Resume/DownloadResumeButton';
import './Hero.css';

export default function Body() {
  const { profile } = portfolio;
  return (
    <section id="about" className="hero container" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{profile.location}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <h2 className="hero-descriptor">{profile.role} at {profile.company}</h2>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions"><Button to="/#work">Selected work</Button><DownloadResumeButton variant="text" /></div>
        <div className="hero-socials"><SocialLinks showLabels /></div>
      </div>
    </section>
  );
}
