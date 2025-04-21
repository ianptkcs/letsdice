import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { seed } from "drizzle-seed";
import * as enums from "./schemas/general.enums";
import * as userSchema from "./schemas/user.schema";
import * as scheduleSchema from "./schemas/schedule.schema";
import * as tableSchema from "./schemas/table.schema";
import postgres from "postgres";

config({ path: "./.env" });

const main = async () => {
    if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is not set");

    const client = postgres(process.env.POSTGRES_URL, { prepare: false });
    const db = drizzle(client, { casing: "snake_case" });
};

main();
