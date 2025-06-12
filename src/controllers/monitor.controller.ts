import Monitor from "../models/Monitor.ts";

class MonitorController {
  static listarMonitores = async (req, res, next) => {
     console.log(`--> ${JSON.stringify({...req.query})}`);
    try {
      const monitoresResultado = new Monitor({ ...req.query, ...req.body });
      console.log(`--> ${JSON.stringify(monitoresResultado)}`);
      res.status(200).json(monitoresResultado);
    } catch (erro) {
      next(erro);
    }
  };
}

export default MonitorController;
