import express from "express";
import ConsultasController from "../controllers/consultasController.js";

const routes = express.Router();

routes.get("/consultas", ConsultasController.listarConsultas);
routes.get("/consultas/:usuarioId", ConsultasController.buscarConsultasDoUsuario);
routes.post("/consultas", ConsultasController.cadastrarConsulta);
routes.put("/consultas/:id", ConsultasController.atualizarConsulta);
routes.delete("/consultas/:id", ConsultasController.deletarConsulta);

export default routes;
