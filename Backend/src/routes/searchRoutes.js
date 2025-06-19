import express from "express";
import LeitosController from "../controllers/leitosController.js";
import UsuariosController from "../controllers/usuariosController.js";
import ConsultasController from "../controllers/consultasController.js";
import ExamesController from "../controllers/examesController.js";

const routes = express.Router();

// LEITOS
routes.get("/leito", LeitosController.buscarLeitos); // Busca por query (search/leito?query=valor)
routes.get("/leito/:id", LeitosController.buscarLeitoPorId);

// USUARIOS
routes.get("/user", UsuariosController.buscarUsuarios); // Busca por query tbm
routes.get("/user/:id", UsuariosController.buscarUsuarioPorId);

// CONSULTAS
routes.get("/consulta/:id", ConsultasController.buscarConsultaPorId);
routes.get("/consulta/user/:usuarioId", ConsultasController.buscarConsultasDoUsuario);

// EXAMES
routes.get("/exame/:id", ExamesController.buscarExamePorId);
routes.get("/exame/user/:usuarioId", ExamesController.buscarExamesDoUsuario);

export default routes;
