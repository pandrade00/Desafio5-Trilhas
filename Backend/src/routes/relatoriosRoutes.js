import express from "express";
import RelatoriosController from "../controllers/relatoriosController.js";
import { autenticar, permitirRoles } from "../middlewares/index.js";

const routes = express.Router();

routes.post("/jogo", RelatoriosController.receberRelatorio);
routes.post("/usuario", autenticar, RelatoriosController.relatoriosDoUsuario);
routes.get("/", autenticar, permitirRoles("admin"), RelatoriosController.listarRelatorios);

export default routes;
