import { PostAuthor } from '@/types';

export async function getUserInfo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/userInfo`);
  const data: PostAuthor = await res.json();
  return data;
}
