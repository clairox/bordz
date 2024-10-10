ALTER TABLE "addresses" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "owner_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "product_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "deck_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "trucks_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "wheels_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "bearings_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "hardware_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "board_setups" ALTER COLUMN "griptape_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "cart_line_items" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "cart_line_items" ALTER COLUMN "product_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "cart_line_items" ALTER COLUMN "cart_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "owner_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "colors" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "component_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "category_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "vendor_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "size_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "component_attributes" ALTER COLUMN "color_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "components" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "sizes" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "vendors" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "order_line_items" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "order_line_items" ALTER COLUMN "product_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "order_line_items" ALTER COLUMN "order_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "customer_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "user_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "default_address_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "wishlist_line_items" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "wishlist_line_items" ALTER COLUMN "product_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "wishlist_line_items" ALTER COLUMN "wishlist_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "wishlists" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "wishlists" ALTER COLUMN "owner_id" SET DATA TYPE varchar(36);

CREATE OR REPLACE FUNCTION update_cart_on_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Update cart's subtotal, total, and totalQuantity when an item is added
    UPDATE carts
    SET
        subtotal = subtotal + NEW.subtotal,
        total = total + NEW.total, -- TODO: adjust this if there are other calculations (taxes, shipping, etc.)
        total_quantity = total_quantity + 1
    WHERE id = NEW.cart_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cart_line_item_insert_trigger
AFTER INSERT ON cart_line_items
FOR EACH ROW EXECUTE FUNCTION update_cart_on_insert();

CREATE OR REPLACE FUNCTION update_cart_on_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Update cart's subtotal, total, and totalQuantity when an item is deleted
    UPDATE carts
    SET
        subtotal = subtotal - OLD.subtotal,
        total = total - OLD.total, -- TODO: adjust this if there are other calculations (taxes, shipping, etc.)
        total_quantity = total_quantity - 1
    WHERE id = OLD.cart_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cart_line_item_delete_trigger
AFTER DELETE ON cart_line_items
FOR EACH ROW EXECUTE FUNCTION update_cart_on_delete();

CREATE OR REPLACE FUNCTION update_cart_on_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Update cart's subtotal, total, and totalQuantity when an item is updated
    UPDATE carts
    SET
        subtotal = subtotal - OLD.subtotal + NEW.subtotal,
        total = total - OLD.total + NEW.total -- TODO: adjust this if there are other calculations (taxes, shipping, etc.)
    WHERE id = NEW.cart_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cart_line_item_update_trigger
AFTER UPDATE ON cart_line_items
FOR EACH ROW EXECUTE FUNCTION update_cart_on_update();
