CREATE UNIQUE INDEX IF NOT EXISTS "full_name_address_idx" ON "addresses" USING btree ("full_name","formatted");