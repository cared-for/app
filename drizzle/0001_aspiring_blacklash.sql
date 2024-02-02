ALTER TABLE "caredFor_users" RENAME COLUMN "check_in_time" TO "schedule_id";--> statement-breakpoint
ALTER TABLE "caredFor_users" ALTER COLUMN "schedule_id" SET DATA TYPE varchar(256);