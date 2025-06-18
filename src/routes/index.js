import express from "express";
import leito from "../routes/leitosRoutes.js";
import search from "../routes/searchRoutes.js";

const routes = (app) => {
  const router = express.Router();

  app.use(express.json());
  
  router.get("/", (req, res) => res.status(200).send("Diagnostix"));

  router.use(leito);
  router.use(search);

  app.use(router);
};

export default routes;
