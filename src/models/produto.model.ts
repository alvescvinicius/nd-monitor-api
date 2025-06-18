import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, HasMany } from 'sequelize-typescript';
import { Movimentacao } from './movimentacao.model';

@Table({ tableName: 'produtos', timestamps: false })
export class Produto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  codigo!: string;

  @Column(DataType.STRING)
  descricao!: string;

  @HasMany(() => Movimentacao)
  movimentacoes!: Movimentacao[];
}
