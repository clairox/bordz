ALTER TABLE "customers" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_email_unique" UNIQUE("email");