import { Sequelize } from 'sequelize-typescript';
import { Produto } from '../models/produto.model';

export class ProdutoRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll(): Promise<Produto[]> {
    return Produto.findAll();
  }

  async findById(id: number): Promise<Produto | null> {
    return Produto.findByPk(id);
  }

  async create(data: Partial<Produto>): Promise<Produto> {
    const transaction = await this.sequelize.transaction();
    try {
      const created = await Produto.create(data as any, { transaction });
      await transaction.commit();
      return created;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: number, data: Partial<Produto>): Promise<Produto | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const instance = await Produto.findByPk(id, { transaction });
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
      const deleted = await Produto.destroy({ where: { id }, transaction });
      await transaction.commit();
      return deleted > 0;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
