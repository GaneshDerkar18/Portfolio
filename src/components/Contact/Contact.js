<<<<<<< HEAD
import { useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import { SocialLinks } from '../ui/Shared';

function ContactForm() {
  const [state, handleSubmit, reset] = useForm(portfolio.site.formspreeId);
  const [networkError, setNetworkError] = useState(false);
  const [pending, setPending] = useState(false);
  const locked = useRef(false);
  const submit = async event => {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setPending(true);
    setNetworkError(false);
    try { await handleSubmit(event); } catch { setNetworkError(true); }
    finally { setPending(false); locked.current = false; }
  };
  if (state.succeeded) return <div className="form-success" role="status"><span className="success-icon"><Icon name="check" size={28} /></span><h3>Message sent. Thank you!</h3><p>I appreciate you reaching out. I’ll get back to you by email.</p><button type="button" className="button button-outline" onClick={reset}>Send another message</button></div>;
  return <form onSubmit={submit} className="contact-form"><div className="form-heading"><h3>Send me a message</h3><span className="small-label">All fields required</span></div><div className="form-row"><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" maxLength="100" required /><ValidationError prefix="Name" field="name" errors={state.errors} /></div><div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@example.com" maxLength="254" required /><ValidationError prefix="Email" field="email" errors={state.errors} /></div></div><div className="form-field"><label htmlFor="contact-subject">What’s on your mind?</label><input id="contact-subject" name="subject" placeholder="A project, an opportunity, an idea…" maxLength="200" required /></div><div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows="4" placeholder="Tell me a little about it…" maxLength="5000" required /><ValidationError prefix="Message" field="message" errors={state.errors} /></div><div className="form-error" role="alert"><ValidationError errors={state.errors} />{networkError && <p>Your message couldn’t be sent. Please try again or use the email link.</p>}</div><button type="submit" disabled={pending || state.submitting} className="button button-primary">{pending || state.submitting ? 'Sending…' : 'Send message'}<Icon name="arrow" size={18} /></button><p className="form-note">Sent securely through Formspree.</p></form>;
}
export default function Contact({ standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="contact" className={`contact-section ${standalone ? 'standalone-contact' : ''}`}><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">{standalone ? 'Get in touch' : '04 / Let’s connect'}</p><Heading>{portfolio.site.contactHeading}</Heading><p>{portfolio.site.contactDescription}</p><a className="email-link" href={`mailto:${portfolio.profile.email}`}>{portfolio.profile.email}<Icon name="arrow" size={22} /></a><SocialLinks showLabels /><p className="contact-location"><Icon name="pin" size={16} /> Based in {portfolio.profile.location}. Connected everywhere.</p></div>{portfolio.site.formspreeId ? <ContactForm /> : <div className="email-fallback"><Icon name="mail" size={40} /><h3>Let’s start with an email.</h3><p>Tell me about your project or idea.</p><a className="button button-primary" href={`mailto:${portfolio.profile.email}`}>Write an email <Icon name="arrow" size={18} /></a></div>}</div></section>;
=======
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
>>>>>>> 08d3bc0 (updated ui)
}
