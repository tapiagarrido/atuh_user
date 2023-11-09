import jwt from "jsonwebtoken";

const generarToken = (usuarioToken) => {
    const {id, nombre,usuario, correo} = usuarioToken;
    return jwt.sign({id,nombre,usuario,correo}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

export default generarToken;