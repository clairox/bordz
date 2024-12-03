ALTER TABLE "components" ALTER COLUMN "title" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "components" ADD COLUMN "handle" varchar(150) NOT NULL;