/* Generated metadata reads the same content as every React page. */
const fs = require('node:fs');
const path = require('node:path');
const data = require('../src/data/portfolio.json');
const root = path.resolve(__dirname, '..');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

const ids = new Set();
for (const project of data.projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
    throw new Error(`Project id must be unique and URL-safe: ${project.id}`);
  }
  ids.add(project.id);
  for (const key of ['title', 'category', 'status', 'description', 'overview']) {
    if (!project[key]) throw new Error(`Missing ${key} in project ${project.id}`);
  }
  for (const key of ['technologies', 'highlights']) {
    if (!Array.isArray(project[key])) throw new Error(`${key} must be a list in ${project.id}`);
  }
  for (const key of ['githubUrl', 'demoUrl']) {
    if (project[key] && !/^https?:\/\//i.test(project[key])) throw new Error(`Use a full web URL or an empty value for ${project.id}.${key}`);
  }
}
for (const item of [...data.projects, ...data.achievements]) {
  if (item.image?.startsWith('/') && !fs.existsSync(path.join(root, 'public', item.image))) {
    throw new Error(`Image does not exist: ${item.image}`);
  }
}

<<<<<<< HEAD
=======
if (data.resume) {
  if (typeof data.resume.summary !== 'string') throw new Error('resume.summary must be text.');
  if (!Array.isArray(data.resume.projectIds)) throw new Error('resume.projectIds must be a list of project IDs.');
  for (const id of data.resume.projectIds) {
    if (!ids.has(id)) throw new Error(`Unknown resume project ID: ${id}`);
  }
}

const notices = [
  ['Animate.css 4.1.1 — selected fadeIn animation', 'animate.css/LICENSE'],
  ['jsPDF — PDF generation', 'jspdf/LICENSE'],
  ['Font Awesome Free — selected SVG brand icons', '@fortawesome/fontawesome-free/LICENSE.txt'],
].map(([name, file]) => `${name}\n${fs.readFileSync(path.join(root, 'node_modules', file), 'utf8')}`);
fs.writeFileSync(path.join(root, 'public/third-party-notices.txt'), notices.join('\n\n----------------------------------------\n\n'));

>>>>>>> 08d3bc0 (updated ui)
const title = `${data.profile.role} | ${data.profile.name}`;
const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8');
const values = { TITLE: title, DESCRIPTION: data.site.description, NAME: data.profile.name };
const html = template.replace(/\{\{(TITLE|DESCRIPTION|NAME)\}\}/g, (_, key) => escape(values[key]));
fs.writeFileSync(path.join(root, 'public/index.html'), html);
fs.writeFileSync(path.join(root, 'public/manifest.json'), JSON.stringify({
  short_name: data.profile.name,
  name: title,
  icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
<<<<<<< HEAD
  start_url: '.', display: 'standalone', theme_color: '#0b0e14', background_color: '#0b0e14',
}, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'public/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#11151e"/><text x="8" y="42" font-family="Arial,sans-serif" font-weight="700" font-size="31" letter-spacing="-2" fill="#f1f4fa">${escape(data.profile.initials)}</text><circle cx="53" cy="43" r="3" fill="#8ab4ff"/></svg>\n`);
=======
  start_url: '.', display: 'standalone', theme_color: '#0b1120', background_color: '#0b1120',
}, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'public/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b1120"/><text x="8" y="42" font-family="Arial,sans-serif" font-weight="700" font-size="31" letter-spacing="-2" fill="#eaf0fa">${escape(data.profile.initials)}</text><circle cx="53" cy="43" r="3" fill="#91b8ff"/></svg>\n`);
>>>>>>> 08d3bc0 (updated ui)
console.log(`Content validated: ${data.projects.length} projects. Metadata synchronized.`);
