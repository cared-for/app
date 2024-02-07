CREATE TABLE IF NOT EXISTS "caredFor_stripe_customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" varchar(256) NOT NULL,
	"relational_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "caredFor_dependents" ALTER COLUMN "full_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_dependents" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "caredFor_users" DROP COLUMN IF EXISTS "customer_id";