import express from "express";
import UsuariosController from "../controllers/usuariosController.js";

const routes = express.Router();

routes.get("/", UsuariosController.listarUsuarios);
routes.post("/", UsuariosController.cadastrarUsuario);
routes.put("/:id", UsuariosController.atualizarUsuario);
routes.delete("/:id", UsuariosController.deletarUsuario);

export default routes;
