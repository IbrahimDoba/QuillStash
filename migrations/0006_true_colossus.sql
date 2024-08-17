ALTER TABLE "posts" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "bodyImage";--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_unique" UNIQUE("slug");