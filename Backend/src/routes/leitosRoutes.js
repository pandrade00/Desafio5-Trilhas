import express from "express";
import LeitosController from "../controllers/leitosController.js";

const routes = express.Router();

routes.get("/", LeitosController.listarLeitos);
routes.post("/", LeitosController.cadastrarLeito);
routes.put("/:id", LeitosController.atualizarLeito);
routes.delete("/:id", LeitosController.deletarLeito);

export default routes;
