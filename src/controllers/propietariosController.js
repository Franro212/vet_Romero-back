import Propietarios from "../models/propietarios";
import mongoose from "mongoose";

export async function createPropietario(req, res) {
  const {
    propietario,
    telefono,
    socio,
    numeroSocio,
    telefonoSecundario,
    email,
  } = req.body;

  if (!propietario || !telefono) {
    return res.status(400).json({
      message: "Propietario y teléfono son campos obligatorios",
      error: true,
    });
  }

  try {
    const newPropietario = new Propietarios({
      propietario,
      telefono,
      socio,
      numeroSocio,
      telefonoSecundario,
      email,
    });
    await newPropietario.save();
    return res.status(201).json({
      message: "Propietario creado con éxito",
      data: newPropietario,
      error: false,
    });
  } catch (err) {
    console.error("Error al crear el propietario:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function getPropietarios(req, res) {
  try {
    const propietarios = await Propietarios.find().populate("pacientes");
    return res.status(200).json({ data: propietarios, error: false });
  } catch (err) {
    console.error("Error al obtener los propietarios:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}
export async function getPropietariosById(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const patient = await Propietarios.findById(id);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Propietario no encontrado", error: true });
    }
    return res.status(200).json({ data: patient, error: false });
  } catch (err) {
    console.error("Error al obtener el propietario:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function updatePropietario(req, res) {
  const { id } = req.params;
  const { propietario, telefono, socio, numeroSocio } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const updatedPropietario = await Propietarios.findByIdAndUpdate(
      id,
      { propietario, telefono, socio, numeroSocio, telefonoSecundario, email },
      { new: true },
    );
    if (!updatedPropietario) {
      return res
        .status(404)
        .json({ message: "Propietario no encontrado", error: true });
    }
    return res.status(200).json({
      message: "Propietario actualizado con éxito",
      data: updatedPropietario,
      error: false,
    });
  } catch (err) {
    console.error("Error al actualizar el propietario:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function deletePropietario(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const propietario = await Propietarios.findByIdAndDelete(id);
    if (!propietario) {
      return res
        .status(404)
        .json({ message: "Propietario no encontrado", error: true });
    }

    return res.status(200).json({
      message: "Propietario eliminado correctamente",
      data: propietario,
      error: false,
    });
  } catch (err) {
    console.error("Error al eliminar el propietario:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}
