CREATE UNIQUE INDEX IF NOT EXISTS "cart_id_product_id_idx" ON "cart_line_items" USING btree ("cart_id","product_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "checkout_id_product_id_idx" ON "checkout_line_items" USING btree ("checkout_id","product_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "order_id_product_id_idx" ON "order_line_items" USING btree ("order_id","product_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wishlist_id_product_id_idx" ON "wishlist_line_items" USING btree ("wishlist_id","product_id");