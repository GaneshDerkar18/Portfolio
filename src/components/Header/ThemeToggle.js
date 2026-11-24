import { useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#181818' : '#fbfbfa');
    try { localStorage.setItem('theme', theme); } catch { /* Theme remains usable without storage. */ }
  }, [theme]);
  return <Button variant="icon" className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></Button>;
}
