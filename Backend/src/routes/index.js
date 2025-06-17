import express from "express";
import leito from "../routes/leitosRoutes.js";
import search from "../routes/searchRoutes.js";

const routes = (app) => {
  app.use(express.json());
  app.route("/").get((req, res) => res.status(200).send("Diagnostix"));

  app.use(leito);
  app.use(search);
};

export default routes;
