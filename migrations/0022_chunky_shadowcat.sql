ALTER TABLE "tags" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_slug_unique" UNIQUE("slug");