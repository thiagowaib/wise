CREATE TABLE "logio" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"method" varchar(10) NOT NULL,
	"endpoint" text NOT NULL,
	"ip" varchar(50) NOT NULL,
	"user_agent" text,
	"request_data" jsonb,
	"response_data" jsonb,
	"status_code" varchar(3)
);
