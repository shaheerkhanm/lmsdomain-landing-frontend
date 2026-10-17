import DOMPurify from 'isomorphic-dompurify';

/**
 * Strict allowlist configuration for CMS-rendered rich text HTML.
 * Preserves structural formatting, typography, links, and lists while stripping
 * script execution, malicious attributes (onload, onerror, etc.), and unknown tags.
 */
const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'b',
    'i',
    'strong',
    'em',
    'u',
    's',
    'strike',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'code',
    'pre',
    'hr',
    'sub',
    'sup',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'title', 'id'],
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  ADD_ATTR: ['target', 'rel'],
  FORCE_BODY: false,
};

/**
 * Sanitizes CMS HTML content safely.
 * Returns empty string if input is null/undefined.
 * Prevents double encoding by operating directly on incoming raw HTML.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const clean = DOMPurify.sanitize(html, {
    ...SANITIZE_OPTIONS,
    RETURN_DOM: false,
  });

  return String(clean);
}

export default sanitizeHtml;

