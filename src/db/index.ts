import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";
// import * as schema from "./schema";
import * as schema from "../../migrations/schema";
import * as relations from "../../migrations/relations";

config({ path: ".env.development.local" });

export const db = drizzle(sql, { schema: { ...schema, ...relations } });
