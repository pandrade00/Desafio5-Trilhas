import express from "express";
import LeitosController from "../controllers/leitosController.js";
import UsuariosController from "../controllers/usuariosController.js";
import ConsultasController from "../controllers/consultasController.js";
import ExamesController from "../controllers/examesController.js";

const routes = express.Router();

routes.post("/leitos", LeitosController.cadastrarLeito);
routes.put("/leitos/:id", LeitosController.atualizarLeito);
routes.delete("/leitos/:id", LeitosController.deletarLeito);

routes.get("/usuarios/busca", UsuariosController.buscarUsuarios);
routes.delete("/usuarios/:id", UsuariosController.adminDeletarUsuario);
routes.get("/usuarios", UsuariosController.listarUsuarios);

routes.get("/consultas", ConsultasController.listarConsultas);
routes.get("/consultas/:id", ConsultasController.buscarConsultaPorId);

routes.get("/exames", ExamesController.listarExames);
routes.get("/exames/:id", ExamesController.buscarExamePorId);


export default routes;
