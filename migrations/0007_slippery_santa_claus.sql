DROP TABLE "verificationToken";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "featured" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "views" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");