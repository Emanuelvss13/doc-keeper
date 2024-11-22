ALTER TABLE "documents" ADD COLUMN "storagePath" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "code";