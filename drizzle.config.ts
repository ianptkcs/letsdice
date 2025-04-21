import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: "./.env" });

if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is not set");

export default defineConfig({
    schema: "./src/lib/server/db/schemas",
    out: "./supabase/migrations",
    dbCredentials: {
        url: process.env.POSTGRES_URL,
    },
    verbose: true,
    strict: true,
    dialect: "postgresql",
});
