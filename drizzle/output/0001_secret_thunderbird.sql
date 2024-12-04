ALTER TABLE "components" ADD COLUMN "image" varchar(100);--> statement-breakpoint
ALTER TABLE "components" DROP COLUMN IF EXISTS "featured_image";--> statement-breakpoint
ALTER TABLE "components" DROP COLUMN IF EXISTS "images";