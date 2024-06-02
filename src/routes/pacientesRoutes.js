import express from 'express';
const router = express.Router();
import { getAllPatients, addPatient, getPatientById, updatePatient, deletePatient } from '../controllers/pacientesController';

router.get('/', getAllPatients);

router.post('/', addPatient);

router.get('/:id', getPatientById);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

export default router;
