import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config()

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "2kuzvtvSomq6ci2.root",
    password: "JZCqW6hZkXMiKE5q",
    database: "clinique_db",
    ssl: { rejectUnauthorized: true }
  },
} satisfies Config
