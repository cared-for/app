ALTER TABLE "caredFor_users" RENAME COLUMN "on_free_trial" TO "isPaying";--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "attempt_count" SET NOT NULL;