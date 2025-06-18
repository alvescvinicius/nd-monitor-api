import { Sequelize } from 'sequelize-typescript';
import { Movimentacao } from '../models/movimentacao.model';

export class MovimentacaoRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll(): Promise<Movimentacao[]> {
    return Movimentacao.findAll({
      include: ['produto', 'instituicao', 'tipoEntradaSaida', 'tipoMovimentacao']
    });
  }

  async findById(id: number): Promise<Movimentacao | null> {
    return Movimentacao.findByPk(id, {
      include: ['produto', 'instituicao', 'tipoEntradaSaida', 'tipoMovimentacao']
    });
  }

  async create(data: Partial<Movimentacao>): Promise<Movimentacao> {
    const transaction = await this.sequelize.transaction();
    try {
      const created = await Movimentacao.create(data as any, { transaction });
      await transaction.commit();
      return created;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: number, data: Partial<Movimentacao>): Promise<Movimentacao | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const instance = await Movimentacao.findByPk(id, { transaction });
      if (!instance) {
        await transaction.rollback();
        return null;
      }
      await instance.update(data as any, { transaction });
      await transaction.commit();
      return instance;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    const transaction = await this.sequelize.transaction();
    try {
      const deleted = await Movimentacao.destroy({ where: { id }, transaction });
      await transaction.commit();
      return deleted > 0;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
