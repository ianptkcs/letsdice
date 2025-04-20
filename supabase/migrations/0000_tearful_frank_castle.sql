CREATE SCHEMA "schedule";
--> statement-breakpoint
CREATE SCHEMA "table";
--> statement-breakpoint
CREATE SCHEMA "user";
--> statement-breakpoint
CREATE TYPE "public"."genre" AS ENUM('Fantasy', 'SciFi', 'Horror', 'Cyberpunk', 'Superhero', 'Western', 'PostApocalyptic', 'Historical', 'Mystery', 'Thriller', 'Romance', 'Comedy', 'Drama', 'Action', 'Adventure');--> statement-breakpoint
CREATE TYPE "public"."system" AS ENUM('own', 'coc', 'dnd', 'op');--> statement-breakpoint
CREATE TYPE "schedule"."weekday" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "table"."applicationStatus" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "table"."defaultQuestion" AS ENUM('rpg_definition', 'rpg_experience', 'favorite_rpg_element', 'character_creation', 'rpg_moment', 'memorable_character', 'rpg_campaign', 'rpg_challenge', 'rpg_system_preference', 'rpg_homebrew', 'good_gm', 'good_player', 'expectations', 'character_death', 'dislike', 'like', 'sensible_content', 'about_homebrew', 'about_rules', 'fav_culture_character', 'fav_songs', 'fav_song_style', 'character_concept');--> statement-breakpoint
CREATE TYPE "table"."formStatus" AS ENUM('open', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "table"."tableStatus" AS ENUM('open', 'ongoing', 'finished');--> statement-breakpoint
CREATE TYPE "table"."tableType" AS ENUM('campaign', 'oneshot');--> statement-breakpoint
CREATE TYPE "user"."gender" AS ENUM('male', 'female', 'nonbinary', 'other');--> statement-breakpoint
CREATE TABLE "schedule"."schedule" (
	"id" uuid PRIMARY KEY NOT NULL,
	"weekday" "schedule"."weekday" NOT NULL,
	"hours" integer[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule"."scheduleToPlayer" (
	"scheduleId" uuid,
	"playerId" text,
	CONSTRAINT "scheduleToPlayer_scheduleId_playerId_pk" PRIMARY KEY("scheduleId","playerId")
);
--> statement-breakpoint
CREATE TABLE "schedule"."scheduleToTable" (
	"scheduleId" uuid,
	"tableId" integer,
	CONSTRAINT "scheduleToTable_scheduleId_tableId_pk" PRIMARY KEY("scheduleId","tableId")
);
--> statement-breakpoint
CREATE TABLE "table"."application" (
	"id" serial PRIMARY KEY NOT NULL,
	"formId" integer,
	"playerId" text,
	"status" "table"."applicationStatus" DEFAULT 'pending' NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "table"."customAnswer" (
	"applicationId" integer,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	CONSTRAINT "customAnswer_applicationId_question_pk" PRIMARY KEY("applicationId","question")
);
--> statement-breakpoint
CREATE TABLE "table"."defaultAnswer" (
	"playerId" text,
	"question" "table"."defaultQuestion" NOT NULL,
	"answer" text NOT NULL,
	CONSTRAINT "defaultAnswer_playerId_question_pk" PRIMARY KEY("playerId","question")
);
--> statement-breakpoint
CREATE TABLE "table"."form" (
	"tableId" integer PRIMARY KEY NOT NULL,
	"introduction" text NOT NULL,
	"defaultQuestions" "table"."defaultQuestion"[],
	"customQuestions" text[],
	"status" "table"."formStatus" DEFAULT 'open' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "table"."table" (
	"id" serial PRIMARY KEY NOT NULL,
	"gmId" text,
	"title" text NOT NULL,
	"banner" text NOT NULL,
	"description" text NOT NULL,
	"system" "system" NOT NULL,
	"vacancies" integer NOT NULL,
	"minAge" integer DEFAULT 0,
	"genres" "genre"[] NOT NULL,
	"startDate" date DEFAULT now() NOT NULL,
	"type" "table"."tableType" DEFAULT 'campaign' NOT NULL,
	"status" "table"."tableStatus" DEFAULT 'open' NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "table"."tableToUsers" (
	"tableId" integer,
	"userId" text,
	CONSTRAINT "tableToUsers_tableId_userId_pk" PRIMARY KEY("tableId","userId")
);
--> statement-breakpoint
CREATE TABLE "user"."gm" (
	"uid" text PRIMARY KEY NOT NULL,
	"systems" "system"[],
	"genres" "genre"[]
);
--> statement-breakpoint
CREATE TABLE "user"."player" (
	"uid" text PRIMARY KEY NOT NULL,
	"systems" "system"[],
	"genres" "genre"[]
);
--> statement-breakpoint
CREATE TABLE "user"."user" (
	"supId" text PRIMARY KEY NOT NULL,
	"id" serial NOT NULL,
	"slug" text NOT NULL,
	"userName" text NOT NULL,
	"realName" text,
	"avatar" text NOT NULL,
	"aboutMe" text NOT NULL,
	"birthDate" date,
	"gender" "user"."gender",
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "schedule"."scheduleToPlayer" ADD CONSTRAINT "scheduleToPlayer_scheduleId_schedule_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "schedule"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule"."scheduleToPlayer" ADD CONSTRAINT "scheduleToPlayer_playerId_player_uid_fk" FOREIGN KEY ("playerId") REFERENCES "user"."player"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule"."scheduleToTable" ADD CONSTRAINT "scheduleToTable_scheduleId_schedule_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "schedule"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule"."scheduleToTable" ADD CONSTRAINT "scheduleToTable_tableId_table_id_fk" FOREIGN KEY ("tableId") REFERENCES "table"."table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."application" ADD CONSTRAINT "application_formId_form_tableId_fk" FOREIGN KEY ("formId") REFERENCES "table"."form"("tableId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."application" ADD CONSTRAINT "application_playerId_player_uid_fk" FOREIGN KEY ("playerId") REFERENCES "user"."player"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."customAnswer" ADD CONSTRAINT "customAnswer_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "table"."application"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."defaultAnswer" ADD CONSTRAINT "defaultAnswer_playerId_player_uid_fk" FOREIGN KEY ("playerId") REFERENCES "user"."player"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."form" ADD CONSTRAINT "form_tableId_table_id_fk" FOREIGN KEY ("tableId") REFERENCES "table"."table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."table" ADD CONSTRAINT "table_gmId_gm_uid_fk" FOREIGN KEY ("gmId") REFERENCES "user"."gm"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."tableToUsers" ADD CONSTRAINT "tableToUsers_tableId_table_id_fk" FOREIGN KEY ("tableId") REFERENCES "table"."table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table"."tableToUsers" ADD CONSTRAINT "tableToUsers_userId_gm_uid_fk" FOREIGN KEY ("userId") REFERENCES "user"."gm"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user"."gm" ADD CONSTRAINT "gm_uid_user_supId_fk" FOREIGN KEY ("uid") REFERENCES "user"."user"("supId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user"."player" ADD CONSTRAINT "player_uid_user_supId_fk" FOREIGN KEY ("uid") REFERENCES "user"."user"("supId") ON DELETE no action ON UPDATE no action;