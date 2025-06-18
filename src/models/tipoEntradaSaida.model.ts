import { Table, Column, Model, DataType, PrimaryKey, Unique, HasMany } from 'sequelize-typescript';
import { Movimentacao } from './movimentacao.model';

@Table({ tableName: 'tipos_entrada_saida', timestamps: false })
export class TipoEntradaSaida extends Model {
  @PrimaryKey
  @Column(DataType.TINYINT)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  nome!: string;

  @HasMany(() => Movimentacao)
  movimentacoes!: Movimentacao[];
}
