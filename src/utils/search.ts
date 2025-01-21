import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { posts, tags, users } from '@/db/schema';

export const searchPosts = async (query: string) => {
  const allPosts = await db.query.posts.findMany({ with: { author: true } });
  const filteredPosts = allPosts.filter((post) => post.title.includes(query));
  return filteredPosts;
};

export const searchTags = async (query: string) => {
  const allTags = await db.query.tags.findMany({});
  const filteredTags = allTags.filter((tag) => tag.name.includes(query));
  return filteredTags;
};

export const searchUsers = async (query: string) => {
  const allUsers = await db.query.users.findMany({});
  const filteredUsers = allUsers.filter((user) =>
    user.username.includes(query)
  );
  return filteredUsers;
};
