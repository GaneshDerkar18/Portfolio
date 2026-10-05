import { useRef, useState } from 'react';
import portfolio from '../../data/portfolio.json';
import { getResumeData } from '../../utils/resume';
import Button from '../ui/Button';

export default function DownloadResumeButton({ variant = 'primary', className = '' }) {
  const [status, setStatus] = useState('idle');
  const pending = useRef(false);
  const download = async () => {
    if (pending.current) return;
    pending.current = true;
    setStatus('loading');
    try {
      const [{ jsPDF }, { createResumePdf }] = await Promise.all([import('jspdf'), import('../../utils/resumePdf')]);
      const resume = getResumeData(portfolio);
      await createResumePdf(resume, jsPDF).save(resume.fileName, { returnPromise: true });
      setStatus('done');
    } catch { setStatus('error'); }
    finally { pending.current = false; }
  };
  return <div className={`resume-download ${className}`}><Button variant={variant} icon="download" onClick={download} disabled={status === 'loading'} aria-busy={status === 'loading'}>{status === 'loading' ? 'Preparing PDF…' : 'Download resume'}</Button><span className="sr-only" role="status">{status === 'done' ? 'Your resume download is ready.' : ''}</span>{status === 'error' && <p role="alert" className="download-error">The download couldn’t start. Please retry, or <Button to="/resume" variant="text">open the print version</Button>.</p>}</div>;
}
