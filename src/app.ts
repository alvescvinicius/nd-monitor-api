import express from 'express';

import cors from 'cors';

import movimentacoes from './routes/movimentacoes.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', movimentacoes);

export default app;
