import express from "express";
import LeitosController from "../controllers/leitosController.js";
import UsuariosController from "../controllers/usuariosController.js";
import ConsultasController from "../controllers/consultasController.js";
import ExamesController from "../controllers/examesController.js";

const routes = express.Router();

//LEITOS
routes.post("/leitos", LeitosController.cadastrarLeito);
routes.put("/leitos/:id", LeitosController.atualizarLeito);
routes.delete("/leitos/:id", LeitosController.deletarLeito);

//USUARIOS
routes.get("/usuarios/busca", UsuariosController.buscarUsuarios);
routes.get("/usuarios", UsuariosController.listarUsuarios);

//CONSULTAS
routes.get("/consultas", ConsultasController.listarConsultas);
routes.get("/consultas/:id", ConsultasController.buscarConsultaPorId);

//EXAMES
routes.get("/exames", ExamesController.listarExames);
routes.get("/exames/:id", ExamesController.buscarExamePorId);


export default routes;
