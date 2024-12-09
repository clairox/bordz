CREATE TABLE IF NOT EXISTS "default_addresses" (
	"owner_id" varchar(36),
	"address_id" varchar(36),
	CONSTRAINT "default_addresses_owner_id_address_id_pk" PRIMARY KEY("owner_id","address_id")
);
--> statement-breakpoint
DROP INDEX IF EXISTS "owner_id_full_name_address_idx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "default_addresses" ADD CONSTRAINT "default_addresses_owner_id_customers_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "default_addresses" ADD CONSTRAINT "default_addresses_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "owner_id_full_name_address_idx" ON "addresses" USING btree ("owner_id","full_name","formatted") WHERE "addresses"."owner_id" is not null;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "default_address_id";