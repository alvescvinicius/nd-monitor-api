
export default class Monitor {

  private idMonitor: number;
  private dataInclusao: Date;
  private dataAlteracao: Date;

  constructor(data: any){
    this.idMonitor = data.idMonitor;
    this.dataInclusao = data.dataInclusao;
    this.dataAlteracao = data.dataAlteracao;
  }

}
/*
import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: true,
  },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

const monitors = mongoose.model("monitors", monitorSchema);

export default monitors;
*/
