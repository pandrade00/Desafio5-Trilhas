import express from "express";
import LeitosController from "../controllers/leitosController.js";

const routes = express.Router();

routes.get("/leitos", LeitosController.buscarLeitos);

export default routes;
