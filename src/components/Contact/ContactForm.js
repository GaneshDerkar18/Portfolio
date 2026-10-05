import { useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import FormField from '../ui/FormField';

export default function ContactForm() {
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
  const error = (field, prefix) => <ValidationError prefix={prefix} field={field} errors={state.errors} />;
  if (state.succeeded) return <div className="form-success" role="status"><span className="success-icon"><Icon name="check" size={28} /></span><h3>Message sent. Thank you!</h3><p>I appreciate you reaching out. I’ll get back to you by email.</p><Button variant="outline" onClick={reset}>Send another message</Button></div>;
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-heading"><h3>Send me a message</h3><span className="small-label">All fields required</span></div>
      <div className="form-row">
        <FormField id="contact-name" label="Your name" name="name" autoComplete="name" placeholder="Alex Morgan" maxLength={100} required error={error('name', 'Name')} />
        <FormField id="contact-email" label="Email address" name="email" type="email" autoComplete="email" placeholder="alex@example.com" maxLength={254} required error={error('email', 'Email')} />
      </div>
      <FormField id="contact-subject" label="What’s on your mind?" name="subject" placeholder="A project, an opportunity, an idea…" maxLength={200} required error={error('subject', 'Subject')} />
      <FormField id="contact-message" label="Your message" name="message" multiline rows={4} placeholder="Tell me a little about it…" maxLength={5000} required error={error('message', 'Message')} />
      <div className="form-error" role="alert"><ValidationError errors={state.errors} />{networkError && <p>Your message couldn’t be sent. Please try again or use the email link.</p>}</div>
      <Button type="submit" disabled={pending || state.submitting} icon="arrow">{pending || state.submitting ? 'Sending…' : 'Send message'}</Button>
      <p className="form-note">Sent securely through Formspree.</p>
    </form>
  );
}
