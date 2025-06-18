import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, HasMany } from 'sequelize-typescript';
import { Movimentacao } from './movimentacao.model';

@Table({ tableName: 'instituicoes', timestamps: false })
export class Instituicao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  nome!: string;

  @HasMany(() => Movimentacao)
  movimentacoes!: Movimentacao[];
}
