import express from "express";
import LeitosController from "../controllers/leitosController.js";

const routes = express.Router();

routes.get("/leitos", LeitosController.listarLeitos);
routes.get("/leitos/buscar", LeitosController.buscarLeitos);
routes.post("/leitos", LeitosController.cadastrarLeito);
routes.put("/leitos/:id", LeitosController.atualizarLeito);
routes.delete("/leitos/:id", LeitosController.deletarLeito);

export default routes;
