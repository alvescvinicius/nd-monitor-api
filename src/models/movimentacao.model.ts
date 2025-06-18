import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Produto } from './produto.model';
import { Instituicao } from './instituicao.model';
import { TipoMovimentacao } from './tipoMovimentacao.model';
import { TipoEntradaSaida } from './tipoEntradaSaida.model';

@Table({
  tableName: 'movimentacoes',
  timestamps: false
})
export class Movimentacao extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'data'
  })
  data!: Date;

  @ForeignKey(() => TipoEntradaSaida)
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'tipo_entrada_saida_id'
  })
  tipoEntradaSaidaId!: number;

  @ForeignKey(() => TipoMovimentacao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'tipo_movimentacao_id'
  })
  tipoMovimentacaoId!: number;

  @ForeignKey(() => Produto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'produto_id'
  })
  produtoId!: number;

  @ForeignKey(() => Instituicao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'instituicao_id'
  })
  instituicaoId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'quantidade'
  })
  quantidade!: number;

  @Column({
    type: DataType.DECIMAL(15, 5),
    allowNull: true,
    field: 'preco_unitario' 
  })
  precoUnitario!: number | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    field: 'valor_operacao'
  })
  valorOperacao!: number;

  // Relacionamentos (opcional, caso use eager loading)
  @BelongsTo(() => Produto)
  produto!: Produto;

  @BelongsTo(() => Instituicao)
  instituicao!: Instituicao;

  @BelongsTo(() => TipoMovimentacao)
  tipoMovimentacao!: TipoMovimentacao;

  @BelongsTo(() => TipoEntradaSaida)
  tipoEntradaSaida!: TipoEntradaSaida;
}
