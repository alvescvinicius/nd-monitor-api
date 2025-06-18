import { Sequelize } from 'sequelize-typescript';
import { TipoMovimentacao } from '../models/tipoMovimentacao.model';

export class TipoMovimentacaoRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll(): Promise<TipoMovimentacao[]> {
    return TipoMovimentacao.findAll();
  }

  async findById(id: number): Promise<TipoMovimentacao | null> {
    return TipoMovimentacao.findByPk(id);
  }

  async create(data: Partial<TipoMovimentacao>): Promise<TipoMovimentacao> {
    const transaction = await this.sequelize.transaction();
    try {
      const created = await TipoMovimentacao.create(data as any, { transaction });
      await transaction.commit();
      return created;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: number, data: Partial<TipoMovimentacao>): Promise<TipoMovimentacao | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const instance = await TipoMovimentacao.findByPk(id, { transaction });
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
      const deleted = await TipoMovimentacao.destroy({ where: { id }, transaction });
      await transaction.commit();
      return deleted > 0;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
