DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dependents_email_idx" ON "caredFor_dependents" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "customer_id_idx" ON "caredFor_stripe_customers" ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "relational_id_idx" ON "caredFor_stripe_customers" ("relational_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "caredFor_users" ("email");