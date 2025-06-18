import { Request, Response } from 'express';
import { MovimentacaoService } from '../services/movimentacao.service';
import { sequelize } from '../database/laboratorio.sequelize';
import { parseProduto } from '../utils/parseProduto';
import { getTipoEntradaSaidaId, getTipoMovimentacaoId } from '../utils/helpers';

const movimentacaoService = new MovimentacaoService(sequelize);

export const MovimentacaoController = {

  async listar(req: Request, res: Response) {
    const lista = await movimentacaoService.listarTodas();
    return res.json(lista);
  },

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    const movimentacao = await movimentacaoService.buscarPorId(id);
    if (!movimentacao) return res.status(404).json({ erro: 'Transação não encontrada.' });

    return res.json(movimentacao);
  },

  async criar(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body["Entrada/Saída"] || !body["Movimentação"] || !body["Produto"] || !body["Instituição"] || !body["Data"]) {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
      }

      const tipoEntradaSaidaId = await getTipoEntradaSaidaId(body["Entrada/Saída"]);
      const tipoMovimentacaoId = await getTipoMovimentacaoId(body["Movimentação"]);
      const { codigo, descricao } = parseProduto(body["Produto"]);

      const precoUnitario = body["Preço unitário"] === '-' ? 0 : parseFloat(body["Preço unitário"]);
      const valorOperacao = body["Valor da Operação"] === '-' ? 0 : parseFloat(body["Valor da Operação"]);

      if (isNaN(valorOperacao)) {
        return res.status(400).json({ erro: 'Valor da operação inválido.' });
      }

      const dto = {
        tipo_entrada_saida_id: tipoEntradaSaidaId,
        tipo_movimentacao_id: tipoMovimentacaoId,
        data: new Date(body["Data"].split('/').reverse().join('-')),
        produto_codigo: codigo,
        produto_descricao: descricao,
        instituicao_nome: body["Instituição"],
        quantidade: Number(body["Quantidade"]) || 0,
        preco_unitario: precoUnitario,
        valor_operacao: valorOperacao
      };

      const nova = await movimentacaoService.criarMovimentacao(dto);
      return res.status(201).json(nova);

    } catch (err: any) {
      console.error('[Erro ao criar transação]', err);
      return res.status(400).json({ erro: err.message || 'Erro ao criar transação.' });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

      const atualizada = await movimentacaoService.atualizarMovimentacao(id, req.body);
      if (!atualizada) return res.status(404).json({ erro: 'Transação não encontrada.' });

      return res.json(atualizada);
    } catch (err: any) {
      console.error('[Erro ao atualizar transação]', err);
      return res.status(400).json({ erro: err.message || 'Erro ao atualizar transação.' });
    }
  },

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    const sucesso = await movimentacaoService.deletarMovimentacao(id);
    return res.status(sucesso ? 204 : 404).end();
  }
};
