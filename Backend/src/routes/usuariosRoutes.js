import express from "express";
import UsuariosController from "../controllers/usuariosController.js";
import { autenticar, permitirRoles } from "../middlewares/index.js";

const routes = express.Router();

routes.post("/login", UsuariosController.logarUsuario);

routes.get("/", autenticar, permitirRoles("admin"), UsuariosController.listarUsuarios);
routes.post("/", UsuariosController.cadastrarUsuario);

routes.put("/:id", autenticar, UsuariosController.atualizarUsuario);
routes.delete("/:id", autenticar, UsuariosController.deletarUsuario);


export default routes;
