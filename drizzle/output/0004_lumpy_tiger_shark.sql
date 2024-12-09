DROP INDEX IF EXISTS "full_name_address_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "owner_id_full_name_address_idx" ON "addresses" USING btree ("owner_id","full_name","formatted") WHERE "addresses"."owner_id" is not null;
