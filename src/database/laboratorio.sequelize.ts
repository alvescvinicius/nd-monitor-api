import { Sequelize } from 'sequelize-typescript';
import { Instituicao } from '../models/instituicao.model';
import { Produto } from '../models/produto.model';
import { TipoMovimentacao } from '../models/tipoMovimentacao.model';
import { TipoEntradaSaida } from '../models/tipoEntradaSaida.model';
import { Movimentacao } from '../models/movimentacao.model';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'developer',
  password: 'developer',
  database: 'laboratorio',
  models: [Instituicao, Produto, TipoMovimentacao, TipoEntradaSaida, Movimentacao],
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
