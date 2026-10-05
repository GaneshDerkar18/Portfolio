import portfolio from '../../data/portfolio.json';
import Icon from '../ui/Icon';
import { CompanyText, SkillSymbol } from '../ui/Shared';
import { normalizeSkill } from '../../utils/content';
import useHangingMotion from '../ui/useHangingMotion';

export default function ProfileCard() {
  const { anchorRef, swingRef } = useHangingMotion();
  const { profile, experience, skillGroups } = portfolio;
  const current = experience.find(job => job.current);
  const technologies = skillGroups.flatMap(group => group.skills.map(normalizeSkill))
    .filter(skill => skill.featured).slice(0, 4);

  return (
    <aside ref={anchorRef} className="profile-badge" aria-labelledby="profile-card-name">
      <div className="badge-clip" aria-hidden="true"><span /></div>
      <div ref={swingRef} className="profile-badge-face" data-pointer-surface>
        <div className="badge-header"><span className="mono"><Icon name="code" size={15} />Meet the developer</span><span className="badge-status"><i />Full stack</span></div>
        <div className="badge-art" aria-hidden="true">
          <svg className="badge-orbit" viewBox="0 0 340 170" fill="none">
            <circle cx="170" cy="85" r="66" className="badge-orbit-ring" />
            <ellipse cx="170" cy="85" rx="93" ry="34" className="badge-orbit-path" />
            <ellipse cx="170" cy="85" rx="34" ry="66" className="badge-orbit-path" />
            <g className="badge-orbit-dots"><circle cx="77" cy="85" r="3" /><circle cx="170" cy="19" r="3" /><circle cx="244" cy="107" r="2" /></g>
          </svg>
          <div className="badge-monogram">{profile.initials}<span>.</span></div>
          {technologies.map((skill, index) => <span className={`badge-tech badge-tech-${index + 1}`} key={skill.name}><SkillSymbol skill={skill} size={18} /><span>{skill.name}</span></span>)}
        </div>
        <div className="badge-identity"><p className="small-label">The person behind the code</p><h2 id="profile-card-name">{profile.name}<span>.</span></h2><p>{profile.role}</p></div>
        <div className="badge-job"><span className="badge-company-mark" aria-hidden="true">/</span><div><span className="small-label">{current?.role || profile.role} at</span><strong><CompanyText>{current?.company || profile.company}</CompanyText></strong></div><span className="badge-location"><Icon name="pin" size={13} />{profile.location}</span></div>
        {profile.focus?.length > 0 && <dl className="badge-focus">{profile.focus.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
      </div>
    </aside>
  );
}
