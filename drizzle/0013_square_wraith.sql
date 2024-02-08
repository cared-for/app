DROP TABLE "caredFor_stripe_customers";--> statement-breakpoint
ALTER TABLE "caredFor_users" ADD COLUMN "customer_id" varchar(256);