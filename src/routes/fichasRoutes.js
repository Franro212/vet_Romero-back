import express from 'express';
const router = express.Router();
import { getAllFichas, addFicha, getFichaById, updateFicha, deleteFicha } from '../controllers/fichasController';

router.get('/:pacienteId', getAllFichas);

router.post('/:pacienteId', addFicha);

router.get('/:id', getFichaById);

router.put('/:id', updateFicha);

router.delete('/:id', deleteFicha);

export default router;
