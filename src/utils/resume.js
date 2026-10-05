import { getSocialLinks, normalizeSkill, isProjectConcept } from './content.js';

// Both the onscreen document and the PDF use this exact model.
export function getResumeData(data) {
  const config = data.resume || {};
  const projectIds = config.projectIds || [];
  return {
    name: data.profile.name,
    role: data.profile.role,
    location: data.profile.location,
    email: data.profile.email,
    phone: config.phone || '',
    summary: config.summary || data.profile.intro,
    links: getSocialLinks(data.profile, { resume: true }),
    skills: data.skillGroups.map(group => ({ label: group.label, items: group.skills.map(skill => normalizeSkill(skill).name) })),
    experience: data.experience,
    companyWebsites: data.companyWebsites || {},
    education: Array.isArray(data.education) ? data.education : [data.education],
    projects: projectIds.map(id => data.projects.find(project => project.id === id)).filter(project => project && !isProjectConcept(project)),
    achievements: config.includeAchievements ? data.achievements : [],
    certifications: config.includeCertifications ? data.certifications || [] : [],
    fileName: `${(config.fileName || `${data.profile.name}-Resume`).replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '') || 'Resume'}.pdf`,
  };
}
