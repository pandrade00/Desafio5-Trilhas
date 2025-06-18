import express from "express";
import LeitosController from "../controllers/leitosController.js";
import UsuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/search", LeitosController.buscarLeitos);
router.get("/search/user", UsuariosController.buscarUsuarios);

export default router;
