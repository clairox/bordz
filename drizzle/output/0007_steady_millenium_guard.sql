ALTER TABLE "default_addresses" DROP CONSTRAINT "default_addresses_owner_id_address_id_pk";--> statement-breakpoint
ALTER TABLE "default_addresses" ADD PRIMARY KEY ("owner_id");--> statement-breakpoint
ALTER TABLE "default_addresses" ALTER COLUMN "owner_id" SET NOT NULL;