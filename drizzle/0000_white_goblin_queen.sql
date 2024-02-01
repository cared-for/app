CREATE TABLE IF NOT EXISTS "caredFor_dependents" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"phone" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "caredFor_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"phone" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"checked_in" boolean DEFAULT false NOT NULL,
	"check_in_time" time,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"on_free_trial" boolean DEFAULT true NOT NULL,
	"free_trial_start" timestamp,
	"completed_user_onboarding" boolean DEFAULT false NOT NULL
);
