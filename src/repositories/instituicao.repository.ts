import { Sequelize } from 'sequelize-typescript';
import { Instituicao } from '../models/instituicao.model';

export class InstituicaoRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll(): Promise<Instituicao[]> {
    return Instituicao.findAll();
  }

  async findById(id: number): Promise<Instituicao | null> {
    return Instituicao.findByPk(id);
  }

  async create(data: Partial<Instituicao>): Promise<Instituicao> {
    const transaction = await this.sequelize.transaction();
    try {
      const created = await Instituicao.create(data as any, { transaction });
      await transaction.commit();
      return created;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: number, data: Partial<Instituicao>): Promise<Instituicao | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const inst = await Instituicao.findByPk(id, { transaction });
      if (!inst) {
        await transaction.rollback();
        return null;
      }
      await inst.update(data as any, { transaction });
      await transaction.commit();
      return inst;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    const transaction = await this.sequelize.transaction();
    try {
      const deleted = await Instituicao.destroy({ where: { id }, transaction });
      await transaction.commit();
      return deleted > 0;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
