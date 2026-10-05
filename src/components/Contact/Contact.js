import { lazy, Suspense } from 'react';
import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import AnimatedText from '../ui/AnimatedText';
import { SocialLinks } from '../ui/Shared';
const ContactForm = lazy(() => import('./ContactForm'));

export default function Contact({ standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section id="contact" className={`contact-section ${standalone ? 'standalone-contact' : ''}`}>
      <Reveal className="container contact-grid">
        <div className="contact-copy">
          <span className="contact-star" aria-hidden="true">✳</span>
          <p className="eyebrow">{standalone ? 'Get in touch' : '04 / Let’s connect'}</p>
          <Heading><AnimatedText text={portfolio.site.contactHeading} /></Heading><p>{portfolio.site.contactDescription}</p>
          <a className="email-link" href={`mailto:${portfolio.profile.email}`}>{portfolio.profile.email}<Icon name="arrow" size={22} /></a>
          <SocialLinks showLabels /><p className="contact-location"><Icon name="pin" size={16} /> Based in {portfolio.profile.location}. Connected everywhere.</p>
        </div>
        {portfolio.site.formspreeId ? <Suspense fallback={<div className="form-placeholder" role="status">Loading the contact form…</div>}><ContactForm /></Suspense> : <div className="email-fallback"><Icon name="mail" size={40} /><h3>Let’s start with an email.</h3><p>Tell me about your project or idea.</p><Button href={`mailto:${portfolio.profile.email}`} icon="arrow">Write an email</Button></div>}
      </Reveal>
    </section>
  );
}
