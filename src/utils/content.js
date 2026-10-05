import { safeHref } from './links.js';

// A plain string is enough for supporting skills; objects add visual detail.
export const normalizeSkill = skill => typeof skill === 'string' ? { name: skill } : skill;

// Planned ideas stay separate from work visitors can explore.
export const isProjectConcept = project => project.status === 'Concept';

export function groupProjects(projects) {
  return {
    work: projects.filter(project => !isProjectConcept(project)),
    concepts: projects.filter(isProjectConcept),
  };
}

export const projectCountLabel = (count, singular = 'project') => `${count} ${singular}${count === 1 ? '' : 's'}`;

// Shared by React and PDF annotations; content remains plain, selectable text.
export function getCompanySegments(value, websites = {}) {
  const entries = Object.entries(websites)
    .map(([name, url]) => [name, safeHref(url)])
    .filter(([name, url]) => name && /^https?:/.test(url || ''))
    .sort(([a], [b]) => b.length - a.length);
  let parts = [{ text: String(value || '') }];
  for (const [name, href] of entries) {
    parts = parts.flatMap(part => {
      if (part.href) return [part];
      const chunks = part.text.split(name);
      return chunks.flatMap((text, index) => index ? [{ text: name, href }, { text }] : [{ text }]);
    });
  }
  return parts.filter(part => part.text);
}

export function getSocialLinks(profile, { resume = false } = {}) {
  return (profile.socials || []).filter(link =>
    link.enabled !== false && /^https?:/.test(safeHref(link.url) || '') &&
    (!resume || link.showInResume !== false)
  );
}

export function groupExperience(experience) {
  return experience.reduce((groups, job) => {
    const previous = groups[groups.length - 1];
    if (previous?.company === job.company) previous.roles.push(job);
    else groups.push({ company: job.company, roles: [job] });
    return groups;
  }, []);
}
