import { useEffect, useState } from 'react';
import Icon from '../ui/Icon';
<<<<<<< HEAD
=======
import Button from '../ui/Button';
>>>>>>> 08d3bc0 (updated ui)

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
<<<<<<< HEAD
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#f6f8fc');
    try { localStorage.setItem('theme', theme); } catch { /* Theme remains usable without storage. */ }
  }, [theme]);
  return <button type="button" className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></button>;
=======
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1120' : '#f7f9fd');
    try { localStorage.setItem('theme', theme); } catch { /* Theme remains usable without storage. */ }
  }, [theme]);
  return <Button variant="icon" className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></Button>;
>>>>>>> 08d3bc0 (updated ui)
}
