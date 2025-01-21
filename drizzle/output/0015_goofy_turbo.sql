ALTER TABLE "board_setups" RENAME TO "boards";--> statement-breakpoint
ALTER TABLE "cart_line_items" RENAME TO "cart_lines";--> statement-breakpoint
ALTER TABLE "checkout_line_items" RENAME TO "checkout_lines";--> statement-breakpoint
ALTER TABLE "component_attributes" RENAME TO "board_component_attrs";--> statement-breakpoint
ALTER TABLE "components" RENAME TO "board_components";--> statement-breakpoint
ALTER TABLE "order_line_items" RENAME TO "order_lines";--> statement-breakpoint
ALTER TABLE "wishlist_line_items" RENAME TO "wishlist_items";--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_deck_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_trucks_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_wheels_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_bearings_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_hardware_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_setups_griptape_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_lines" DROP CONSTRAINT "cart_line_items_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_lines" DROP CONSTRAINT "cart_line_items_cart_id_carts_id_fk";
--> statement-breakpoint
ALTER TABLE "checkout_lines" DROP CONSTRAINT "checkout_line_items_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "checkout_lines" DROP CONSTRAINT "checkout_line_items_checkout_id_checkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "component_attributes_component_id_components_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "component_attributes_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "component_attributes_vendor_id_vendors_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "component_attributes_size_id_sizes_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "component_attributes_color_id_colors_id_fk";
--> statement-breakpoint
ALTER TABLE "order_lines" DROP CONSTRAINT "order_line_items_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "order_lines" DROP CONSTRAINT "order_line_items_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_line_items_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_line_items_wishlist_id_wishlists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_deck_id_board_components_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_trucks_id_board_components_id_fk" FOREIGN KEY ("trucks_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_wheels_id_board_components_id_fk" FOREIGN KEY ("wheels_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_bearings_id_board_components_id_fk" FOREIGN KEY ("bearings_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_hardware_id_board_components_id_fk" FOREIGN KEY ("hardware_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_griptape_id_board_components_id_fk" FOREIGN KEY ("griptape_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_lines" ADD CONSTRAINT "cart_lines_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_lines" ADD CONSTRAINT "cart_lines_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkout_lines" ADD CONSTRAINT "checkout_lines_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkout_lines" ADD CONSTRAINT "checkout_lines_checkout_id_checkouts_id_fk" FOREIGN KEY ("checkout_id") REFERENCES "public"."checkouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_component_id_board_components_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_vendor_id_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_wishlist_id_wishlists_id_fk" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
