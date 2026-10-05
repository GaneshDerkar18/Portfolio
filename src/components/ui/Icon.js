import { ReactComponent as GitHub } from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import { ReactComponent as LinkedIn } from '@fortawesome/fontawesome-free/svgs/brands/linkedin-in.svg';
import { ReactComponent as Twitter } from '@fortawesome/fontawesome-free/svgs/brands/x-twitter.svg';
import { ReactComponent as ReactLogo } from '@fortawesome/fontawesome-free/svgs/brands/react.svg';
import { ReactComponent as Angular } from '@fortawesome/fontawesome-free/svgs/brands/angular.svg';
import { ReactComponent as Docker } from '@fortawesome/fontawesome-free/svgs/brands/docker.svg';
import { ReactComponent as JavaScript } from '@fortawesome/fontawesome-free/svgs/brands/js.svg';
import { ReactComponent as Bootstrap } from '@fortawesome/fontawesome-free/svgs/brands/bootstrap.svg';
import { ReactComponent as Node } from '@fortawesome/fontawesome-free/svgs/brands/node-js.svg';
import { ReactComponent as Python } from '@fortawesome/fontawesome-free/svgs/brands/python.svg';

const brands = { github: GitHub, linkedin: LinkedIn, 'x-twitter': Twitter, react: ReactLogo, angular: Angular, docker: Docker, javascript: JavaScript, bootstrap: Bootstrap, node: Node, python: Python };
const paths = {
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  leetcode: 'm14 2-9 9a4 4 0 0 0 0 6l3 3a4 4 0 0 0 6 0l2-2M8 8a4 4 0 0 1 6 0l2 2M10 14h11',
  database: 'M20 5c0 4-16 4-16 0s16-4 16 0ZM4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0',
  down: 'M12 4v16m-6-6 6 6 6-6',
  left: 'M20 12H4m6-6-6 6 6 6',
  print: 'M7 8V3h10v5M7 17H3V8h18v9h-4M7 14h10v7H7zM17 11h.01',
  arrow: 'M7 17 17 7M7 7h10v10',
  right: 'M4 12h16m-6-6 6 6-6 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
  server: 'M4 3h16v7H4zM4 14h16v7H4zM7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  window: 'M3 4h18v16H3zM3 9h18M6 6.5h.01M9 6.5h.01',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4',
  mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
  check: 'm5 12 4 4L19 6',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  moon: 'M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  book: 'M3 4h6l3 2 3-2h6v16h-6l-3 2-3-2H3V4Zm9 2v16',
  film: 'M3 3h18v18H3zM7 3v18M17 3v18M3 8h4m10 0h4M3 16h4m10 0h4M7 12h10',
  utensils: 'M5 3v7m3-7v7m3-7v7M5 7h6m-3 3v11M19 3c-3 3-4 6-4 9h4m0-9v18',
  scan: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 8h10M7 12h10M7 16h6',
  search: 'M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM16 16l5 5',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
};
export default function Icon({ name, size = 20, className = '' }) {
  const Brand = brands[name];
  if (Brand) return <Brand width={size} height={size} fill="currentColor" className={className} aria-hidden="true" focusable="false" />;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d={paths[name] || paths.globe} /></svg>;
}
