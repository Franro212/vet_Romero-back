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
  validateUser,
  validateUserLogin,
} from "../validators/userValidator.js";
const router = express.Router();

router.get("/", verifyToken, getAdmin);
router.post("/login", validateUserLogin, login);
router.post("/", verifyToken, validateUser, register);
router.put("/:id", verifyToken, validateUser, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
