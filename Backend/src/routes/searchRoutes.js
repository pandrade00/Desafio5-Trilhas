import express from "express";
import LeitosController from "../controllers/leitosController.js";

const router = express.Router();

router.get("/search", LeitosController.buscarHospitaisPorNome);

export default router;
