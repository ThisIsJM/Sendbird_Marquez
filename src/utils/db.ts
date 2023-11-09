import { Pool } from "pg";


let conn:  Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.DEV_PGSQL_USER,
    password: process.env.DEV_PGSQL_PASSWORD,
    host: process.env.DEV_PGSQL_HOST,
    port: parseInt(process.env.DEV_PGSQL_PORT ?? ''),
    database: process.env.DEV_PGSQL_DATABASE,
  });
}

export default conn ;