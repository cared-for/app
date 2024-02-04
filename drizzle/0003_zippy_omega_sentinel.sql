ALTER TABLE "caredFor_dependents" ADD COLUMN "email" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "caredFor_dependents" ADD CONSTRAINT "caredFor_dependents_user_id_caredFor_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "caredFor_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
