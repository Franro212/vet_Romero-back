import express from 'express';
const router = express.Router();
import { getPropietarios, createPropietario, getPropietariosById, updatePropietario, deletePropietario } from '../controllers/propietariosController';

router.get('/', getPropietarios);

router.post('/', createPropietario);

router.get('/:id', getPropietariosById);

router.put('/:id', updatePropietario);

router.delete('/:id', deletePropietario);

export default router;
