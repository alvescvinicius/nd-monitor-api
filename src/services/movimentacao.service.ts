import { TipoMovimentacao } from './../models/tipoMovimentacao.model';
import { Sequelize } from 'sequelize-typescript';
import { Movimentacao } from '../models/movimentacao.model';
import { Produto } from '../models/produto.model';
import { Instituicao } from '../models/instituicao.model';
import { MovimentacaoRepository } from '../repositories/movimentacao.repository';
import { ProdutoRepository } from '../repositories/produto.repository';
import { InstituicaoRepository } from '../repositories/instituicao.repository';

interface CriarMovimentacaoDTO {
  tipo_entrada_saida_id: number;
  data: Date | string;
  tipo_movimentacao_id: number;
  produto_codigo: string;
  produto_descricao: string;
  instituicao_nome: string;
  quantidade: number;
  preco_unitario: number | null;
  valor_operacao: number;
}

export class MovimentacaoService {
  private readonly movimentacaoRepository: MovimentacaoRepository;
  private readonly produtoRepository: ProdutoRepository;
  private readonly instituicaoRepository: InstituicaoRepository;

  constructor(private readonly sequelize: Sequelize) {
    this.movimentacaoRepository = new MovimentacaoRepository(sequelize);
    this.produtoRepository = new ProdutoRepository(sequelize);
    this.instituicaoRepository = new InstituicaoRepository(sequelize);
  }

  async listarTodas(): Promise<Movimentacao[]> {
    return this.movimentacaoRepository.findAll();
  }

  async buscarPorId(id: number): Promise<Movimentacao | null> {
    return this.movimentacaoRepository.findById(id);
  }

  async criarMovimentacao(data: CriarMovimentacaoDTO): Promise<Movimentacao> {
    console.log(`INSERT: ${JSON.stringify(data)}`);

    const transaction = await this.sequelize.transaction();
    try {
      // Validação básica dos IDs numéricos para evitar null/undefined
      if (!data.tipo_entrada_saida_id) throw new Error("tipo_entrada_saida_id é obrigatório");
      if (!data.tipo_movimentacao_id) throw new Error("tipo_movimentacao_id é obrigatório");
      if (!data.valor_operacao && data.valor_operacao !== 0) throw new Error("valor_operacao é obrigatório");
      if (!data.data) throw new Error("data é obrigatória");

      // Produto: buscar ou criar
      let produto = await Produto.findOne({
        where: { codigo: data.produto_codigo },
        transaction
      });

      if (!produto) {
        produto = await Produto.create({
          codigo: data.produto_codigo,
          descricao: data.produto_descricao
        }, { transaction });
        console.log(`\n -> Cadastrado produto: ${JSON.stringify(produto)}`);
      }

      // Instituição: buscar ou criar
      let instituicao = await Instituicao.findOne({
        where: { nome: data.instituicao_nome },
        transaction
      });

      if (!instituicao) {
        instituicao = await Instituicao.create({
          nome: data.instituicao_nome
        }, { transaction });
        console.log(`\n -> Cadastrado instituicao: ${JSON.stringify(instituicao)}`);
      }

      // ✅ Verificar se já existe movimentação com os mesmos dados
      const existente = await Movimentacao.findOne({
        where: {
          tipoEntradaSaidaId: data.tipo_entrada_saida_id,
          tipoMovimentacaoId: data.tipo_movimentacao_id,
          produtoId: produto.id,
          instituicaoId: instituicao.id,
          data: data.data,
          quantidade: data.quantidade,
          precoUnitario: data.preco_unitario,
          valorOperacao: data.valor_operacao
        },
        transaction
      });

      if (existente) {
        console.log(`\n -> Movimentação já existe: ${JSON.stringify(existente)}`);
        await transaction.rollback();
        return existente;
      }

      // Criar movimentação
      const novaMovimentacao = await Movimentacao.create({
        tipoEntradaSaidaId: data.tipo_entrada_saida_id,
        data: data.data,
        tipoMovimentacaoId: data.tipo_movimentacao_id,
        produtoId: produto.id,
        instituicaoId: instituicao.id,
        quantidade: data.quantidade,
        precoUnitario: data.preco_unitario,
        valorOperacao: data.valor_operacao
      }, { transaction });

      await transaction.commit();
      return novaMovimentacao;

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }


  async atualizarMovimentacao(id: number, data: Partial<Movimentacao>): Promise<Movimentacao | null> {
    return this.movimentacaoRepository.update(id, data);
  }

  async deletarMovimentacao(id: number): Promise<boolean> {
    return this.movimentacaoRepository.delete(id);
  }
}
