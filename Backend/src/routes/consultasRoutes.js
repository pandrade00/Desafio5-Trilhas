import express from "express";
import ConsultasController from "../controllers/consultasController.js";

const routes = express.Router();

routes.get("/", ConsultasController.listarConsultas);
routes.post("/", ConsultasController.cadastrarConsulta);
routes.put("/:id", ConsultasController.atualizarConsulta);
routes.delete("/:id", ConsultasController.deletarConsulta);

export default routes;
