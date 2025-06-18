import { Router } from 'express';
import { MovimentacaoController } from '../controllers/movimentacao.controller';

const router = Router();

router.get('/movimentacoes', MovimentacaoController.listar);
router.get('/movimentacoes/:id', MovimentacaoController.buscarPorId);
router.post('/movimentacoes', MovimentacaoController.criar);
router.put('/movimentacoes/:id', MovimentacaoController.atualizar);
router.delete('/movimentacoes/:id', MovimentacaoController.deletar);

export default router;