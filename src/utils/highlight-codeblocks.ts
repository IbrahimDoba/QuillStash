import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';

export async function highlightCodeBlocks(html: string): Promise<string> {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });

  return document.body.innerHTML;
}