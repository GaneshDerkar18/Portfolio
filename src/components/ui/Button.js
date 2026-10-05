import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { safeHref } from '../../utils/links';
import Icon from './Icon';

const Button = forwardRef(function Button({
  to, href, variant = 'primary', size, icon, children, className = '', type = 'button', ...props
}, ref) {
  const styles = variant === 'text' ? 'text-link' : `button button-${variant}`;
  const classes = `${styles} ${size ? `button-${size}` : ''} ${className}`.trim();
  const content = <>{children}{icon && <Icon name={icon} size={18} />}</>;
  if (to) return <Link ref={ref} to={to} className={classes} {...props}>{content}</Link>;
  if (href) {
    const safe = safeHref(href, true);
    if (!safe) return null;
    const external = /^https?:/.test(safe);
    return <a ref={ref} href={safe} className={classes} {...props} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a>;
  }
  return <button ref={ref} type={type} className={classes} {...props}>{content}</button>;
});

export function BackLink({ to = '/#work', children = 'Back to portfolio' }) {
  return <Button to={to} variant="text" className="back-link"><Icon name="left" size={17} />{children}</Button>;
}

export default Button;
