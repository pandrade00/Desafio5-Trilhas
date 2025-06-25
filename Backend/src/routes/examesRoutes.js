import express from "express";
import ExamesController from "../controllers/examesController.js";
import { permitirRoles } from "../middlewares/index.js";

const routes = express.Router();

routes.get("/", permitirRoles("admin"), ExamesController.listarExames);
routes.post("/", ExamesController.cadastrarExame);
routes.put("/:id", ExamesController.atualizarExame);
routes.delete("/:id", ExamesController.deletarExame);

export default routes;
