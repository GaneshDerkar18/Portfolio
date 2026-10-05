const fs = require('node:fs');
const path = require('node:path');
const { jsPDF } = require('jspdf');
const data = require('../src/data/portfolio.json');

(async () => {
  const { getResumeData } = await import('../src/utils/resume.js');
  const { createResumePdf } = await import('../src/utils/resumePdf.js');
  const output = path.join(__dirname, '../tmp/pdfs');
  fs.mkdirSync(output, { recursive: true });
  const resume = getResumeData(data);
  const pdf = createResumePdf(resume, jsPDF);
  fs.writeFileSync(path.join(output, 'resume.pdf'), Buffer.from(pdf.output('arraybuffer')));
  const extended = { ...resume, experience: Array.from({ length: 12 }, (_, i) => ({ ...resume.experience[0], id: `job-${i}`, company: `Example ${i}`, highlights: [...resume.experience[0].highlights, 'A longer bullet to verify automatic wrapping and pagination. '.repeat(8)] })) };
  const longPdf = createResumePdf(extended, jsPDF);
  fs.writeFileSync(path.join(output, 'resume-pagination.pdf'), Buffer.from(longPdf.output('arraybuffer')));
  console.log(`Resume: ${pdf.getNumberOfPages()} page(s). Pagination fixture: ${longPdf.getNumberOfPages()} pages.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
