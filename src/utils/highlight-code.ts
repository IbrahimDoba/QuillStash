import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export async function highlightHtmlCodeBlocks(html: string): Promise<string> {
  
  try {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeHighlight, { detect: true })
      .use(rehypeStringify)
      .process(html);

    return String(file);
  } catch (error) {
    console.error('Error in applying syntax highlighting:', error);
    return html;
  }
}