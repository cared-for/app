import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from './index';

console.log("db url: ", process.env.DATABASE_URL);

// This will run migrations on the database, skipping the ones already applied
async function main() {
  await migrate(db, { migrationsFolder: './drizzle' });
  await client.end();
}

main()
  .then((data) => console.log("migration successful!"))
  .catch((error) => console.error("migration failed: ", error))
