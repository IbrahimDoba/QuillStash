import { Feed } from "feed";
import { siteConfig } from "@/lib/site-config";
import { db } from "@/db";

export async function GET() {
  const articles = await db.query.posts.findMany({
    with: {
      author: {
        columns: {
          username: true,
          name: true,
          website: true,
        },
      },
    },
  });

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: `${siteConfig.url}/home/`,
    language: "en",
    image: siteConfig.ogImage,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      siteConfig.title
    }`,
   //  feedLinks: {
   //    json: `${siteConfig.url}/json`, TODO
   //    atom: `${siteConfig.url}/atom`   TODO
   //  },
    updated: new Date(),
    author: {
      name: siteConfig.title,
      email: siteConfig.email,
      link: siteConfig.url,
    },
  });

  articles.forEach((article) => {
    feed.addItem({
      title: article.title,
      id: `${siteConfig.url}/${article.author.username}/${article.slug}`,
      link: `${siteConfig.url}/${article.author.username}/${article.slug}`,
      description: article.summary ?? siteConfig.description,
      author: [
        {
          name: article.author.name,
          link: article.author.website ?? `${siteConfig.url}/${article.author.username}`,
        },
      ],
      date: article.createdAt,
      image: article.coverImage ?? siteConfig.ogImage,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
