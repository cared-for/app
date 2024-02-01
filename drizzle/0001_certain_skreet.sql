ALTER TABLE "caredFor_users" ALTER COLUMN "full_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "checked_in" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "attempt_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "on_free_trial" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "completed_user_onboarding" DROP NOT NULL;