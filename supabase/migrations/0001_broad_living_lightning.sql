ALTER TABLE "user"."gm" DROP CONSTRAINT "gm_uid_user_supId_fk";
--> statement-breakpoint
ALTER TABLE "user"."player" DROP CONSTRAINT "player_uid_user_supId_fk";
--> statement-breakpoint
ALTER TABLE "user"."gm" ADD CONSTRAINT "gm_uid_user_id_fk" FOREIGN KEY ("uid") REFERENCES "user"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user"."player" ADD CONSTRAINT "player_uid_user_id_fk" FOREIGN KEY ("uid") REFERENCES "user"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user"."user" DROP COLUMN "supId";