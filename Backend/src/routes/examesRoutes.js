import express from "express";
import ExamesController from "../controllers/examesController.js";

const routes = express.Router();

routes.get("/exames", ExamesController.listarExames);
routes.get("/exames/:usuarioId", ExamesController.buscarExamesDoUsuario);
routes.post("/exames", ExamesController.cadastrarExame);
routes.put("/exames/:id", ExamesController.atualizarExame);
routes.delete("/exames/:id", ExamesController.deletarExame);

export default routes;
