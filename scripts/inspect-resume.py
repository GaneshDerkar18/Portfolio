import pymupdf as fitz
import json
from pathlib import Path

companies = json.loads(Path('src/data/portfolio.json').read_text(encoding='utf-8')).get('companyWebsites', {})
for name in ['resume', 'resume-pagination']:
    document = fitz.open(f'tmp/pdfs/{name}.pdf')
    text = '\n'.join(page.get_text(sort=False) for page in document)
    Path(f'tmp/pdfs/{name}.txt').write_text(text, encoding='utf-8')
    assert 'Ganesh Derkar' in text
    assert 'PROFESSIONAL EXPERIENCE' in text
    assert 'OpenAI API' in text
    assert 'EDUCATION' in text
    assert 'AI Workspace' not in text
    assert 'Suvidha Foundation' not in text
    destinations = {link.get('uri') for page in document for link in page.get_links()}
    for company, url in companies.items():
        if company in text:
            assert url in destinations, (name, company, 'missing company hyperlink')
    for index, page in enumerate(document):
        for block in page.get_text('dict')['blocks']:
            if block['type'] == 0:
                for line in block['lines']:
                    for span in line['spans']:
                        x0, y0, x1, y1 = span['bbox']
                        assert x0 >= 40 and y0 >= 30 and x1 <= page.rect.width - 38 and y1 <= page.rect.height - 35, (name, index, span)
        if name == 'resume' or index == 1:
            page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(f'tmp/pdfs/{name}-{index+1}.png')
    print(name, len(document), 'pages; text extraction, company hyperlinks, and page bounds passed')
