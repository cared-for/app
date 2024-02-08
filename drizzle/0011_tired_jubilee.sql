ALTER TABLE "caredFor_stripe_customers" RENAME COLUMN "relational_id" TO "auth_id";--> statement-breakpoint
DROP INDEX IF EXISTS "relational_id_idx";--> statement-breakpoint
ALTER TABLE "caredFor_stripe_customers" ALTER COLUMN "auth_id" SET DATA TYPE varchar(256);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_id" ON "caredFor_stripe_customers" ("auth_id");