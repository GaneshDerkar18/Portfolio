import { Link } from 'react-router-dom';
import { Achievements } from '../Sections';
import Icon from '../ui/Icon';

export default function MoreAbout() {
  return <><section className="container page-intro compact"><Link to="/about" className="text-link"><Icon name="code" size={17} /> About me</Link><p className="eyebrow">Milestones & recognition</p><h1>Certificates & achievements<span className="accent-text">.</span></h1><p className="page-description">A few moments from my learning journey.</p></section><Achievements /></>;
}
