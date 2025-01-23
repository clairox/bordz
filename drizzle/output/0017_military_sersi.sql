ALTER TABLE "checkouts" DROP CONSTRAINT "checkouts_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;