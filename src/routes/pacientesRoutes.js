import express from 'express';
const router = express.Router();
import { getPatients, createPatient, getPatientById, updatePatient, deletePatient } from '../controllers/pacientesController';

router.get('/', getPatients);

router.post('/', createPatient);

router.get('/:id', getPatientById);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

export default router;
