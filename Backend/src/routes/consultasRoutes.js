import express from "express";
import ConsultasController from "../controllers/consultasController.js";
import { permitirRoles } from "../middlewares/index.js";

const routes = express.Router();

routes.get("/", permitirRoles("admin"), ConsultasController.listarConsultas);
routes.post("/", ConsultasController.cadastrarConsulta);
routes.put("/:id", ConsultasController.atualizarConsulta);
routes.delete("/:id", ConsultasController.deletarConsulta);

export default routes;
