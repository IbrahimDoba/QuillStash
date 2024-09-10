import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';

export async function generateTableOfContents(html: string): Promise<{ html: string, toc: string }> {
  const processor = unified()
    .use(rehypeParse, { fragment: true }) 
    .use(rehypeSlug) 
    .use(rehypeAutolinkHeadings, { behavior: 'append' }) 
    .use(rehypeToc, { headings: ['h1', 'h2', 'h3'] }) 
    .use(rehypeStringify); 

  const file = await processor.process(html);

   const toc = file.data.toc;

  return { html: String(file), toc: String(toc) };
}
