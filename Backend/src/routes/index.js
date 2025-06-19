import express from "express";
import leitosRoutes from "./leitosRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import consultasRoutes from "./consultasRoutes.js";
import examesRoutes from "./examesRoutes.js";
import searchRoutes from "./searchRoutes.js";

const routes = (app) => {
  const router = express.Router();

  app.use(express.json());

  router.get("/", (req, res) => res.status(200).send("API Diagnostix"));

  router.use("/leitos", leitosRoutes);
  router.use("/usuarios", usuariosRoutes);
  router.use("/consultas", consultasRoutes);
  router.use("/exames", examesRoutes);
  router.use("/search", searchRoutes);

  app.use("/", router);
};

export default routes;
