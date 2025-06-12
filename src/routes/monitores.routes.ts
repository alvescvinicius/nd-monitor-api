import express from "express";
import MonitoresController from "../controllers/monitor.controller.ts";

const router = express.Router();

router
  .get("/monitores", MonitoresController.listarMonitores)
  /*
  .get("/monitores/busca", MonitoresController.buscarMonitores)
  .get("/monitores/:id", MonitoresController.listarMonitorPorId)
  .post("/monitores", MonitoresController.cadastrarMonitor)
  .patch("/monitores", MonitoresController.cadastrarMonitor)
  .put("/monitores/:id", MonitoresController.atualizarMonitor)
  .delete("/monitores/:id", MonitoresController.excluirMonitor)
  */

export default router;   