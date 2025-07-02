import express from "express";
import ConsultasController from "../controllers/consultasController.js";

const routes = express.Router();

routes.get("/usuario", ConsultasController.buscarConsultasDoUsuario);
routes.post("/", ConsultasController.cadastrarConsulta);
routes.put("/", ConsultasController.atualizarConsulta);
routes.delete("/", ConsultasController.deletarConsulta);

export default routes;
