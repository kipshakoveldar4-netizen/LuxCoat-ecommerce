import pg from "pg";

let pool: pg.Pool | null = null;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined
    });
  }

  return pool;
}

export async function query<T extends pg.QueryResultRow>(
  text: string,
  values: unknown[] = []
) {
  const connection = getPool();

  if (!connection) {
    return null;
  }

  return connection.query<T>(text, values);
}
