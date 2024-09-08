"use client";
import "highlight.js/styles/atom-one-dark.css";
import { sanitizeHtml } from "@/utils/sanitize-html";

function RenderHtml({ html }: { html: string }) {
  const cleanHtml = sanitizeHtml(html);

  return (
    <div
      className="prose w-full max-w-none text-foreground dark:prose-invert xl:prose-lg"
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  );
}

export default RenderHtml;
