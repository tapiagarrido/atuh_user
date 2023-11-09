import jwt from "jsonwebtoken";
import * as USUARIOS from "../models/usuarios.js"

const autorizacion = async (req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {

            token = req.headers.authorization.split(" ")[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuarioValido = await USUARIOS.getOneUsuarioById(decoded.id)

            return next();

        } catch (error) {
            return res.status(404).json({"msg":"Algo no ha salido bien"});
        }
    }

    if(!token){
        const error = new Error("Token no valido");
        return res.status(401).json({"msg": error});
    }

    next();
}

export default autorizacion;