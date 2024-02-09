CREATE TABLE IF NOT EXISTS "caredFor_dependents" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"email" varchar(256),
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "caredFor_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"phone" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"checked_in" boolean DEFAULT false,
	"check_in_time" time,
	"schedule_id" varchar(256),
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"is_paying" boolean DEFAULT false,
	"free_trial_start" timestamp DEFAULT now(),
	"customer_id" varchar(256) NOT NULL,
	"completed_user_onboarding" boolean DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dependents_user_email_idx" ON "caredFor_dependents" ("user_id","email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dependents_user_id_idx" ON "caredFor_dependents" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "caredFor_users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_customer_id_idx" ON "caredFor_users" ("customer_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "caredFor_dependents" ADD CONSTRAINT "caredFor_dependents_user_id_caredFor_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "caredFor_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
