DROP INDEX IF EXISTS "dependents_email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dependents_user_email_idx" ON "caredFor_dependents" ("user_id","email");