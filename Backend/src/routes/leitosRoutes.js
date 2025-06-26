import express from "express";
import LeitosController from "../controllers/leitosController.js";
import { permitirRoles } from "../middlewares/index.js";

const routes = express.Router();

routes.get("/", LeitosController.listarLeitos);
routes.post("/", permitirRoles("admin"), LeitosController.cadastrarLeito);
routes.put("/:id", permitirRoles("admin"), LeitosController.atualizarLeito);
routes.delete("/:id", permitirRoles("admin"), LeitosController.deletarLeito);

export default routes;
