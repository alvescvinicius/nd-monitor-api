import { Sequelize } from 'sequelize-typescript';
import { TipoEntradaSaida } from '../models/tipoEntradaSaida.model';

export class TipoEntradaSaidaRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll(): Promise<TipoEntradaSaida[]> {
    return TipoEntradaSaida.findAll();
  }

  async findById(id: number): Promise<TipoEntradaSaida | null> {
    return TipoEntradaSaida.findByPk(id);
  }

  async create(data: Partial<TipoEntradaSaida>): Promise<TipoEntradaSaida> {
    const transaction = await this.sequelize.transaction();
    try {
      const created = await TipoEntradaSaida.create(data as any, { transaction });
      await transaction.commit();
      return created;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: number, data: Partial<TipoEntradaSaida>): Promise<TipoEntradaSaida | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const instance = await TipoEntradaSaida.findByPk(id, { transaction });
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
      const deleted = await TipoEntradaSaida.destroy({ where: { id }, transaction });
      await transaction.commit();
      return deleted > 0;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
