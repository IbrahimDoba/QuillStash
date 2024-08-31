ALTER TABLE "bookmarks" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;