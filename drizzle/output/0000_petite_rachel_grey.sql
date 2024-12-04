DO $$ BEGIN
 CREATE TYPE "public"."product_type" AS ENUM('BOARD', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"line_1" varchar(255) NOT NULL,
	"line_2" varchar(255),
	"city" varchar(100) NOT NULL,
	"state" varchar(50) NOT NULL,
	"country_code" varchar(3) NOT NULL,
	"postal_code" varchar(12) NOT NULL,
	"phone" varchar(16),
	"formatted" varchar(1000) NOT NULL,
	"owner_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board_setups" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"deck_id" varchar(36) NOT NULL,
	"trucks_id" varchar(36) NOT NULL,
	"wheels_id" varchar(36) NOT NULL,
	"bearings_id" varchar(36) NOT NULL,
	"hardware_id" varchar(36) NOT NULL,
	"griptape_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_line_items" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"subtotal" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"quantity" smallint DEFAULT 1 NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"cart_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"subtotal" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"total_quantity" smallint DEFAULT 0 NOT NULL,
	"owner_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "checkout_line_items" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"quantity" smallint DEFAULT 1 NOT NULL,
	"product_id" varchar(36),
	"checkout_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "checkouts" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"subtotal" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"total_shipping" integer DEFAULT 0 NOT NULL,
	"total_tax" integer DEFAULT 0 NOT NULL,
	"email" varchar(320),
	"completed_at" timestamp,
	"payment_intent_id" varchar(200),
	"cart_id" varchar(36),
	"customer_id" varchar(36),
	"shipping_address_id" varchar(36),
	"order_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"label" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colors" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"label" varchar(25) NOT NULL,
	"value" varchar(7) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "component_attributes" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"component_id" varchar(36) NOT NULL,
	"category_id" varchar(36) NOT NULL,
	"vendor_id" varchar(36),
	"size_id" varchar(36) NOT NULL,
	"color_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "components" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(100) NOT NULL,
	"handle" varchar(150) NOT NULL,
	"featured_image" varchar(100),
	"images" varchar[] DEFAULT '{}' NOT NULL,
	"model" varchar(300),
	"compare_at_price" integer,
	"price" integer DEFAULT 0 NOT NULL,
	"description" text,
	"specifications" text[],
	"available_for_sale" boolean DEFAULT false NOT NULL,
	"total_inventory" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sizes" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"label" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendors" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_line_items" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(100) NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"quantity" smallint DEFAULT 1 NOT NULL,
	"product_id" varchar(36),
	"order_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(16),
	"subtotal" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"total_shipping" integer DEFAULT 0 NOT NULL,
	"total_tax" integer DEFAULT 0 NOT NULL,
	"customer_id" varchar(36),
	"shipping_address_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(100) NOT NULL,
	"featured_image" varchar(200),
	"price" integer DEFAULT 0 NOT NULL,
	"available_for_sale" boolean DEFAULT false NOT NULL,
	"product_type" "product_type" DEFAULT 'BOARD' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"number_of_orders" smallint DEFAULT 0 NOT NULL,
	"phone" varchar(16),
	"user_id" varchar(36) NOT NULL,
	"default_address_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_line_items" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"wishlist_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlists" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"quantity" smallint DEFAULT 0 NOT NULL,
	"owner_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_owner_id_customers_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_deck_id_components_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_trucks_id_components_id_fk" FOREIGN KEY ("trucks_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_wheels_id_components_id_fk" FOREIGN KEY ("wheels_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_bearings_id_components_id_fk" FOREIGN KEY ("bearings_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_hardware_id_components_id_fk" FOREIGN KEY ("hardware_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board_setups" ADD CONSTRAINT "board_setups_griptape_id_components_id_fk" FOREIGN KEY ("griptape_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_line_items" ADD CONSTRAINT "cart_line_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_line_items" ADD CONSTRAINT "cart_line_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_owner_id_customers_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkout_line_items" ADD CONSTRAINT "checkout_line_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkout_line_items" ADD CONSTRAINT "checkout_line_items_checkout_id_checkouts_id_fk" FOREIGN KEY ("checkout_id") REFERENCES "public"."checkouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_shipping_address_id_addresses_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "component_attributes" ADD CONSTRAINT "component_attributes_component_id_components_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."components"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "component_attributes" ADD CONSTRAINT "component_attributes_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "component_attributes" ADD CONSTRAINT "component_attributes_vendor_id_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "component_attributes" ADD CONSTRAINT "component_attributes_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "component_attributes" ADD CONSTRAINT "component_attributes_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_line_items" ADD CONSTRAINT "order_line_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_line_items" ADD CONSTRAINT "order_line_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_addresses_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_line_items" ADD CONSTRAINT "wishlist_line_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_line_items" ADD CONSTRAINT "wishlist_line_items_wishlist_id_wishlists_id_fk" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_owner_id_customers_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
