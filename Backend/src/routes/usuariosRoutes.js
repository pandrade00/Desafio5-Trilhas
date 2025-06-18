import express from "express";
import UsuariosController from "../controllers/usuariosController.js";

const routes = express.Router();

routes.get("/usuarios", UsuariosController.listarUsuarios);
routes.get("/usuarios/buscar", UsuariosController.buscarUsuarios);
routes.post("/usuarios", UsuariosController.cadastrarUsuario);
routes.put("/usuarios/:id", UsuariosController.atualizarUsuario);
routes.delete("/usuarios/:id", UsuariosController.deletarUsuario);

export default routes;
