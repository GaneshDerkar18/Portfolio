export function safeHref(value, allowLocal = false) {
  if (typeof value !== 'string' || Array.from(value).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return null;
  const href = value.trim();
  if (allowLocal && /^\/(?!\/|\\)/.test(href) && !href.includes('\\')) return href;
  if (/^mailto:[^\s@]+@[^\s@]+$/i.test(href)) return href;
  try {
    const url = new URL(href);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function assetUrl(path) {
  const safe = safeHref(path, true);
  return safe?.startsWith('/') ? `${process.env.PUBLIC_URL || ''}${safe}` : safe;
}
