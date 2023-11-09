import connect from "../database/connect.js";
import bcrypt from 'bcrypt';


const saveUsuario = async function (dataUsuario) {
    const { nombre, usuario, correo, telefono, direccion, edad, rut } = dataUsuario;
    let { contraseña } = dataUsuario;
    const saltos = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, saltos);
    const conexion = await connect();
    const query = "INSERT INTO usuarios (nombre,usuario,correo,telefono,direccion,edad,rut,contraseña,fecha_creacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, now()) RETURNING *";
    const values = [nombre, usuario, correo, telefono, direccion, edad, rut, contraseñaHasheada];
    const result = await conexion.query(query, values);
    conexion.release()
    return result.rows[0];
}

const getAllUsuarios = async function () {
    const conexion = await connect();
    const query = "SELECT nombre,usuario,correo,telefono,direccion,edad,rut FROM usuarios where fecha_eliminacion ISNULL";
    const result = await conexion.query(query);
    return result.rows;
}

const getOneUsuarioById = async function (id) {
    const conexion = await connect();
    const query = "SELECT nombre,usuario,correo,telefono,direccion,edad,rut FROM usuarios where id=$1 AND fecha_eliminacion ISNULL"
    const valor = [id]
    const result = await conexion.query(query, valor);
    return result.rows[0];
}

const getOneUsuarioByMail = async function (email) {
    const conexion = await connect();
    const query = "SELECT * FROM usuarios where correo=$1 AND fecha_eliminacion ISNULL"
    const valor = [email]
    const result = await conexion.query(query, valor);
    return result.rows[0];
}

const updateUsuario = async function (id, dataUsuario) {
    const { nombre, usuario, correo, telefono, direccion, edad, rut } = dataUsuario;
    const fechaModificacion = new Date();
    const conexion = await connect();
    const query = "UPDATE usuarios SET nombre=$1,usuario=$2,correo=$3,telefono=$4,direccion=$5,edad=$6,rut=$7,fecha_modificacion=$8 WHERE id=$9 RETURNING *";
    const values = [nombre, usuario, correo, telefono, direccion, edad, rut, fechaModificacion, id];
    const result = await conexion.query(query, values);
    conexion.release();
    return result.rows[0];
}

const deleteUsuario = async function (id) {
    const conexion = await connect();
    const query = "UPDATE usuarios SET fecha_eliminacion=now() where id=$1 RETURNING *";
    const result = await conexion.query(query, [id]);
    conexion.release();
    return result.rows[0];
}

const contraseñaCompare = async function(oldpass,hash){
    return await bcrypt.compare(hash, oldpass)
}

export {
    saveUsuario,
    getAllUsuarios,
    getOneUsuarioById,
    updateUsuario,
    deleteUsuario,
    getOneUsuarioByMail,
    contraseñaCompare
}