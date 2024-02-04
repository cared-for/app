import { type Config } from "drizzle-kit";

import { env } from "~/env.js";

console.log("db url: ", env.DATABASE_URL);

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["app_*"],
} satisfies Config;
