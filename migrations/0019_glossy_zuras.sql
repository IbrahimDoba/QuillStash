ALTER TABLE "users" RENAME COLUMN "github" TO "website";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'writer';