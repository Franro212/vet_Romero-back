import express from 'express';
const router = express.Router();
import { getAllFichas, addFicha, getFichaById, updateFicha, deleteFicha } from '../controllers/fichasController';

router.get('/paciente/:id', getAllFichas);

router.post('/paciente/:id', addFicha);

router.get('/:id', getFichaById);

router.put('/:id', updateFicha);

router.delete('/:id', deleteFicha);

export default router;
