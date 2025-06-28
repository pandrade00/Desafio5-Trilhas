import express from "express";
import ExamesController from "../controllers/examesController.js";

const routes = express.Router();

routes.get("/usuario", ExamesController.buscarExamesDoUsuario);
routes.post("/", ExamesController.cadastrarExame);
routes.put("/", ExamesController.atualizarExame);
routes.delete("/", ExamesController.deletarExame);

export default routes;
