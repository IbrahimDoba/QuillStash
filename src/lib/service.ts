import { nanoid } from 'nanoid';
export interface Post {
  id: string;
  title: string;
  tags: string[];
  username: string;
  slug: string;
}
export function generateSlug(title: string) {
  const slug = title
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // convert all alphabets to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-_]/g, '') // Remove all non-alphanumeric characters except hyphens and underscores
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen

  const randomString = nanoid(5);
  return `${slug}-${randomString}`;
}

export function generateUsername(email: string) {
  const username = email
    .split('@')[0] // Take everything before the '@'
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric characters

  return username;
}

export function generateDisplayName() {
  const randomString = nanoid(4);
  return `User${randomString}`;
}
