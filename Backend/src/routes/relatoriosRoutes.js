import express from "express";
import RelatoriosController from "../controllers/relatoriosController.js";

const routes = express.Router();

routes.post("/jogo", RelatoriosController.receberRelatorio);
routes.get("/", RelatoriosController.listarRelatorios);

export default routes;
