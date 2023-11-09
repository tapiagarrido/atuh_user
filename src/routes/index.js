import express from "express";
const router = express.Router();
import usuarios from "../routes/usuarios.js"

router.use("/usuarios",usuarios)

export default router;