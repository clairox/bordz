ALTER TABLE "board_component_attrs" RENAME COLUMN "component_id" TO "board_component_id";--> statement-breakpoint
ALTER TABLE "board_component_attrs" DROP CONSTRAINT "board_component_attrs_component_id_board_components_id_fk";
--> statement-breakpoint
ALTER TABLE "board_component_attrs" ADD CONSTRAINT "board_component_attrs_board_component_id_board_components_id_fk" FOREIGN KEY ("board_component_id") REFERENCES "public"."board_components"("id") ON DELETE cascade ON UPDATE no action;