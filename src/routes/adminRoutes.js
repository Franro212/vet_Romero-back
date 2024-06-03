import express from "express";
import {
  deleteUser,
  getAdmin,
  login,
  register,
  updateUser,
} from "../controllers/admin.js";
import verifyToken from "../validators/auth.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validators/userValidator.js";

const router = express.Router();

router.get("/", verifyToken, getAdmin);
router.post("/login", validateUserLogin, login);
router.post("/", verifyToken, validateUserRegister, register);
router.put("/:id", verifyToken, validateUserRegister, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
