import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export async function highlightHtmlCodeBlocks(html: string): Promise<string> {
  // Process the HTML with rehype, adding syntax highlighting
  const file = await unified()
    .use(rehypeParse, { fragment: true }) // Parses the HTML as a fragment
    .use(rehypeHighlight) // Add syntax highlighting
    .use(rehypeStringify) // Convert back to HTML
    .process(html);

  return String(file);
}
