import express from "express";
import LeitosController from "../controllers/leitosController.js";

const routes = express.Router();

routes.get("/busca", LeitosController.buscarLeitos);
routes.get("/busca-id/:id", LeitosController.buscarLeitoPorId);

routes.get("/", LeitosController.listarLeitos);
export default routes;
