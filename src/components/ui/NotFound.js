import Button from './Button';

export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">404 / A little off course</p><h1>This page isn’t here.</h1><p>Let’s get you back to the projects.</p><Button to="/projects" icon="right">Explore projects</Button></section>;
}
