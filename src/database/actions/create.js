import connect from "../connect.js"
import fs from "fs/promises"
import logger from "../../libs/logger.js"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDatabaseEmpty = async (conexion) => {
    logger.info("Analizando Database");
    const sql = "SELECT count(*) as count FROM information_schema.tables WHERE table_schema='public'";
    const { rows } = await conexion.query(sql);
    return Number(rows[0].count) === 0;
}



const createTables = async (conexion) => {
  logger.info("Creando Tablas");
  try {
    const sql = await fs.readFile(path.join(__dirname, 'create.sql'), 'utf-8');
    logger.info(sql);
    const result = await conexion.query(sql);
    return result;
  } catch (error) {
    logger.error("Error al crear tablas:", error);
    throw error;
  }
}


(async () => {
    let conexion;
    try {
        conexion = await connect();
        if (!await isDatabaseEmpty(conexion)) {
            throw "La base de datos no esta vacia";
        }
        await createTables(conexion);
        logger.info("Tablas Creadas Exitosamente")
    } catch (error) {
        logger.error(error);
    } finally {
        if (conexion) {
            conexion.release();
        }
    }
})();