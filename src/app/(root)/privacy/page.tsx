import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxContent } from "@/utils/get-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  openGraph: {
    description: "Privacy policy for Quillstash",
  },
};

export default async function Page() {
  const { content } = await getMdxContent("privacy");

  return (
    <article className="prose mx-auto px-6 py-6 dark:prose-invert xl:prose-lg lg:py-12">
      <MDXRemote source={content} />
    </article>
  );
}
