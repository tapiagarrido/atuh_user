import express from "express";
const router = express.Router();
import {saveUsuario,getAllUsuarios,getUsuario,updateUsuario,deleteUsuario,autenticarUsuario,comprobarPerfil} from "../controllers/usuarios.js";
import autorizacion from "../middleware/autorizacion.js";

router.get("/", getAllUsuarios);
router.post("/auth", autenticarUsuario)
router.post("/",saveUsuario);
router.put("/:id",updateUsuario);
router.delete("/:id",deleteUsuario);
router.get("/perfil", autorizacion, comprobarPerfil);
router.get("/:id", getUsuario);

export default router;