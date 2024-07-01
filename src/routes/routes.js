import { Router } from "express";
import verifyToken from "../validators/auth";
import historial from "./fichasRoutes";
import admin from "./adminRoutes";
import pacientes from "./pacientesRoutes";
import propietarios from "./propietariosRoutes";
const router = Router();

router.use("/user", admin);
router.use("/historial", verifyToken, historial);
router.use("/pacientes", verifyToken, pacientes);
router.use("/propietarios", verifyToken, propietarios);

export default router;
