import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/pages');

export const getMdxContent = async (slug:string) => {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents); // Parses frontmatter and content
  return { data, content };
};

export const getAllSlugs = () => {
  const files = fs.readdirSync(contentDirectory);

  return files.map((file) => {
    return {
      params: {
        slug: file.replace(/\.mdx$/, ''),
      },
    };
  });
};
