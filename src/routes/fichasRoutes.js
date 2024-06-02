import express from 'express';
const router = express.Router();
import { getAllFichas, addFicha, getFichaById, updateFicha, deleteFicha } from '../controllers/fichasController';

router.get('/pacientes/:pacienteId/fichas', getAllFichas);

router.post('/pacientes/:pacienteId/fichas', addFicha);

router.get('/fichas/:id', getFichaById);

router.put('/fichas/:id', updateFicha);

router.delete('/fichas/:id', deleteFicha);

export default router;
