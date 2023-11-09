import * as USUARIOS from "../models/usuarios.js"
import generarToken from "../helpers/generarToken.js";

const saveUsuario = async function (req, res) {
    try {
        const solicitud = await USUARIOS.saveUsuario(req.body);
        res.status(201).json({ "msg": "Los datos se han registrado exitosamente", "data": solicitud });
    } catch (error) {
        console.log(error);
    }
}

const getAllUsuarios = async function (req, res) {
    try {
        const solicitud = await USUARIOS.getAllUsuarios();
        if (solicitud.length === 0) return res.json({ "msg": "No se encontraron usuarios registrados" });
        res.status(200).json({ "msg": "Usuarios encontrado exitosamente", "data": solicitud });
    } catch (error) {
        console.log(error);
    }
}

const getUsuario = async function (req, res) {
    try {
        const { id } = req.params;
        const solicitud = await USUARIOS.getOneUsuarioById(id);
        if (!solicitud) return res.json({ "msg": "No se encontraron usuarios registrados" });
        res.status(200).json({ "msg": "Usuario encontrado exitosamente", "data": solicitud });
    } catch (error) {
        console.log(error)
    }
}

const updateUsuario = async function (req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const solicitud = await USUARIOS.updateUsuario(id, body);
        res.status(200).json({ "msg": "Usuario modificado exitosamente", "data": solicitud });
    } catch (error) {
        console.log(error)
    }
}

const deleteUsuario = async function (req, res) {
    try {
        const { id } = req.params;
        const solicitud = await USUARIOS.deleteUsuario(id);
        res.status(200).json({ "msg": "Usuario eliminado exitosamente", "data": solicitud.nombre })
    } catch (error) {
        console.log(error)
    }
}

const autenticarUsuario = async function(req,res){
    const { correo, contraseña } = req.body;
    const usuarioEncontrado = await USUARIOS.getOneUsuarioByMail(correo);

    if(!usuarioEncontrado){
        const error = new Error("No existe este usuario registrado");
        return res.status(403).json({"msg":error.message});
    }

    if(!usuarioEncontrado.confirmado){
        const error = new Error("El usuario no ha confirmado el registro");
        return res.status(403).json({"msg":error.message});
    }

    const {id, nombre,usuario,email,telefono} = usuarioEncontrado;

    if(await USUARIOS.contraseñaCompare(usuarioEncontrado.contraseña,contraseña)){
        res.json({"msg":`Bienvenido ${usuarioEncontrado.nombre}`, id,nombre,usuario,email,telefono,token: generarToken(usuarioEncontrado)});
    }else{
        const error = new Error("La Contraseña no es correcta");
        return res.status(403).json({"msg":error.message});
    }


}

const comprobarPerfil = async (req,res) => {
    const {usuarioValido} = req;
    res.json(usuarioValido);
}

export {
    saveUsuario,
    getAllUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    autenticarUsuario,
    comprobarPerfil
}