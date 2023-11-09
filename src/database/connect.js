import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.USER_SD,
  host: process.env.HOST_SD,
  database: process.env.DATABASE_SD,
  password: process.env.PASSWORD_SD,
  port: 5432
});

export default async function connect() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Conexion exitosa con la base de datos",result.rows[0]);
    return client;
  } catch (err) {
    console.error("Algo ha salido mal", err.stack);
    throw err;
  }
}
