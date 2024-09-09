import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html:string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt']
  });
}