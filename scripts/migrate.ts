import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "../src/core/db/db";

await migrate(db, { migrationsFolder: "./drizzle" });
