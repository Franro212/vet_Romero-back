import Admin from "../models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins.length) {
      return res.status(404).json({
        message: "No se encontró ningún administrador!",
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: "Administrador(es) encontrado(s)!",
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: true,
    });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      email,
      password: passwordEncrypt,
    });

    const createdAdmin = await newAdmin.save();
    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: createdAdmin,
      error: false,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "El email ya está en uso",
        error: true,
      });
    }
    return res.status(500).json({
      message: "Error al crear el usuario",
      error: true,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const existingUser = await Admin.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        message: "El usuario no fue encontrado",
        error: true,
      });
    }

    existingUser.email = email ?? existingUser.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await existingUser.save();
    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      data: updatedUser,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: true,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email y/o contraseña incorrecta/s",
        error: true,
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({
        message: "Email y/o contraseña incorrecta/s",
        error: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '10h' }
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: true,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Admin.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "El usuario no fue encontrado",
        error: true,
      });
    }

    return res.status(200).json({
      message: "El usuario ha sido eliminado correctamente",
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: true,
    });
  }
};
