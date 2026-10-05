import { getCompanySegments } from './content.js';

// Plain text PDF: no screenshots, sidebars, tables, photos, or text-as-paths.
// The jsPDF constructor is injected so it can be loaded only when requested.
export function createResumePdf(resume, JsPDF) {
  const pdf = new JsPDF({ unit: 'pt', format: 'a4', compress: true });
  pdf.setProperties({ title: `${resume.name} - Resume`, author: resume.name, subject: resume.role, keywords: resume.skills.flatMap(group => group.items).join(', ') });
  const margin = 42;
  const width = pdf.internal.pageSize.getWidth() - margin * 2;
  const bottom = pdf.internal.pageSize.getHeight() - margin;
  let y = margin;
  const clean = value => String(value || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2010-\u2015]/g, '-').replace(/\u2026/g, '...').replace(/\u00b7/g, '|');
  const space = (height = 16) => {
    if (y + height > bottom) { pdf.addPage(); y = margin; }
  };
  const text = (value, { size = 10, bold = false, gap = 4, indent = 0 } = {}) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(25, 25, 25);
    const lineHeight = size * 1.38;
    const lines = pdf.splitTextToSize(clean(value), width - indent);
    for (const line of lines) {
      space(lineHeight);
      pdf.text(line, margin + indent, y + size);
      let x = margin + indent;
      for (const part of getCompanySegments(line, resume.companyWebsites)) {
        const partWidth = pdf.getTextWidth(part.text);
        if (part.href) {
          pdf.link(x, y, partWidth, lineHeight, { url: part.href });
          pdf.setDrawColor(90, 90, 90);
          pdf.setLineWidth(0.35);
          pdf.line(x, y + size + 1, x + partWidth, y + size + 1);
        }
        x += partWidth;
      }
      y += lineHeight;
    }
    y += gap;
  };
  const heading = title => {
    // Keep the section title with the first entry, including its own space check.
    space(96);
    y += 9;
    text(title.toUpperCase(), { size: 10.5, bold: true, gap: 3 });
    pdf.setDrawColor(170, 170, 170);
    pdf.setLineWidth(0.4);
    pdf.line(margin, y, margin + width, y);
    y += 7;
  };
  const bullet = value => text(`- ${value}`, { indent: 6, gap: 2 });

  text(resume.name, { size: 21, bold: true, gap: 3 });
  text(resume.role, { size: 11, gap: 4 });
  text([resume.location, resume.email, resume.phone].filter(Boolean).join(' | '), { size: 9, gap: 3 });
  resume.links.forEach(link => text(`${link.label}: ${link.url}`, { size: 9, gap: 2 }));
  heading('Professional Summary');
  text(resume.summary);
  heading('Technical Skills');
  resume.skills.forEach(group => text(`${group.label}: ${group.items.join(', ')}`, { gap: 3 }));
  if (resume.experience.length) {
    heading('Professional Experience');
    resume.experience.forEach(job => {
      space(58);
      text(`${job.role} | ${job.company}`, { bold: true, gap: 2 });
      text([job.period, job.location].filter(Boolean).join(' | '), { size: 9, gap: 4 });
      (job.highlights?.length ? job.highlights : [job.description]).filter(Boolean).forEach(bullet);
      y += 4;
    });
  }
  if (resume.projects.length) {
    heading('Selected Projects');
    resume.projects.forEach(project => {
      space(58);
      text(project.title, { bold: true, gap: 2 });
      text(project.technologies.join(', '), { size: 9, gap: 3 });
      text(project.resumeDescription || project.description, { gap: 3 });
      if (project.githubUrl) text(`Source: ${project.githubUrl}`, { size: 8.5, gap: 4 });
      y += 3;
    });
  }
  if (resume.education.length) {
    heading('Education');
    resume.education.forEach(item => {
      space(42);
      text(item.subject, { bold: true, gap: 2 });
      text([item.institution, item.period].filter(Boolean).join(' | '));
      if (item.detail) text(item.detail);
    });
  }
  if (resume.certifications?.length) {
    heading('Certifications');
    resume.certifications.forEach(item => bullet(`${item.title} | ${item.issuer} | ${item.date}`));
  }
  if (resume.achievements.length) {
    heading('Achievements');
    resume.achievements.forEach(item => bullet(`${item.title}: ${item.description}`));
  }
  return pdf;
}
