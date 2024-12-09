ALTER TABLE "addresses" drop column "formatted";--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "formatted" varchar(1000) GENERATED ALWAYS AS (line_1 || ', ' || 
                        COALESCE(line_2 || ', ', '') || 
                        city || ', ' || 
                        state || ' ' || 
                        postal_code || ', ' || 
                        country_code
                    ) STORED NOT NULL;
