import { TipoMovimentacao } from "../models/tipoMovimentacao.model";
import { TipoEntradaSaida } from "../models/tipoEntradaSaida.model";

export async function getTipoMovimentacaoId(nome: string): Promise<number> {
  try {
    let tipo = await TipoMovimentacao.findOne({ where: { nome } });
    if (!tipo) {
      tipo = await TipoMovimentacao.create({
        nome: nome,
      });
    }
    return tipo.id;
  } catch (error) {
    throw 'Erro em getTipoMovimentacaoId: ' + error;
  }
}

export async function getTipoEntradaSaidaId(nome: string): Promise<number> {
  const tipo = await TipoEntradaSaida.findOne({ where: { nome } });
  if (!tipo) throw new Error(`Tipo de entrada/saída '${nome}' não encontrado.`);
  return tipo.id;
}
