import express from "express";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Diagnostix"));
  const router = express.Router();

  router.get("/leitos", buscarLeitos);

  app.use(express.json(), router);
};

export default routes;
