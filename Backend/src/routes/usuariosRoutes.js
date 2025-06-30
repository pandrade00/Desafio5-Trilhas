import express from "express";
import UsuariosController from "../controllers/usuariosController.js";
import { autenticar } from "../middlewares/index.js";

const routes = express.Router();

routes.get("/usuario", autenticar, UsuariosController.buscarUsuarioPorId);
routes.post("/refresh-token", UsuariosController.renovarUsuario);
routes.post("/login", UsuariosController.logarUsuario);

routes.put("/", autenticar, UsuariosController.atualizarUsuario);
routes.delete("/", autenticar, UsuariosController.deletarUsuario);
routes.post("/", UsuariosController.cadastrarUsuario);

export default routes;
