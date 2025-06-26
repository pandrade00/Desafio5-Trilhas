import express from "express";
import leitosRoutes from "./leitosRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import consultasRoutes from "./consultasRoutes.js";
import examesRoutes from "./examesRoutes.js";
import searchRoutes from "./searchRoutes.js";
import { autenticar } from "../middlewares/index.js";

const routes = (app) => {
  const router = express.Router();

  app.use(express.json());

  router.get("/", (req, res) => res.status(200).send("API Diagnostix"));

  router.use("/usuarios", usuariosRoutes);
  router.use("/leitos", autenticar, leitosRoutes);
  router.use("/consultas", autenticar, consultasRoutes);
  router.use("/exames", autenticar, examesRoutes);
  router.use("/search", autenticar, searchRoutes);

  app.use("/", router);
};

export default routes;
