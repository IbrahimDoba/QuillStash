import { siteConfig } from "@/lib/site-config";

interface NotificationContent {
  slug: string;
  title: string;
  author: string;
}

export async function notifyServer(post: NotificationContent) {
  const url = process.env.DISCORD_BOT_URL;
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: post.author,
        title: post.title,
        url: `${siteConfig.url}/${post.author}/${post.slug}`,
      }),
    });
    console.log(response);
    if (response.ok) {
      console.log('Notification sent successfully!');
    } else {
      console.error('Failed to send notification.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
