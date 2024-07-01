import Paciente from "../models/pacientes";
import Propietarios from "../models/propietarios";
import moment from "moment";
import mongoose from "mongoose";

export async function createPatient(req, res) {
  const {
    nombreAnimal,
    especie,
    fechaNacimiento,
    sexo,
    castrado,
    vacunado,
    desparasitado,
    antipulgas,
    fechaDesparasitado,
    fechaVacunado,
    fechaCastrado,
    fechaAntipulgas,
    propietarioId,
  } = req.body;

  if (!propietarioId || !mongoose.isValidObjectId(propietarioId)) {
    return res
      .status(400)
      .json({
        message: "ID de propietario inválido o no proporcionado",
        error: true,
      });
  }

  try {
    const propietario = await Propietarios.findById(propietarioId);
    if (!propietario) {
      return res
        .status(404)
        .json({ message: "Propietario no encontrado", error: true });
    }

    const newPatient = new Paciente({
      nombreAnimal,
      especie,
      fechaNacimiento,
      sexo,
      castrado,
      vacunado,
      desparasitado,
      antipulgas,
      fechaDesparasitado,
      fechaVacunado,
      fechaCastrado,
      fechaAntipulgas,
      propietario: propietarioId,
    });

    const savedPatient = await newPatient.save();
    propietario.pacientes.push(savedPatient._id);
    await propietario.save();

    return res
      .status(201)
      .json({
        message: "Paciente creado con éxito",
        data: savedPatient,
        error: false,
      });
  } catch (err) {
    console.error("Error al crear el paciente:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function getPatients(req, res) {
  try {
    const patients = await Paciente.find()
      .populate("propietario")
      .populate("historial");
    return res.status(200).json({ data: patients, error: false });
  } catch (err) {
    console.error("Error al obtener los pacientes:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function getPatientById(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const patient = await Paciente.findById(id)
      .populate("propietario")
      .populate("historial");
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Paciente no encontrado", error: true });
    }
    return res.status(200).json({ data: patient, error: false });
  } catch (err) {
    console.error("Error al obtener el paciente:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function updatePatient(req, res) {
  const { id } = req.params;
  const {
    nombreAnimal,
    especie,
    fechaNacimiento,
    sexo,
    castrado,
    vacunado,
    desparasitado,
    antipulgas,
    fechaDesparasitado,
    fechaVacunado,
    fechaCastrado,
    fechaAntipulgas,
    propietarioId,
  } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const patient = await Paciente.findById(id);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Paciente no encontrado", error: true });
    }

    const parsedFechaNacimiento = fechaNacimiento
      ? moment(fechaNacimiento, moment.ISO_8601).toDate()
      : patient.fechaNacimiento;
    const parsedFechaDesparasitado = fechaDesparasitado
      ? moment(fechaDesparasitado, moment.ISO_8601).toDate()
      : patient.fechaDesparasitado;
    const parsedFechaVacunado = fechaVacunado
      ? moment(fechaVacunado, moment.ISO_8601).toDate()
      : patient.fechaVacunado;
    const parsedFechaCastrado = fechaCastrado
      ? moment(fechaCastrado, moment.ISO_8601).toDate()
      : patient.fechaCastrado;
    const parsedFechaAntipulgas = fechaAntipulgas
      ? moment(fechaAntipulgas, moment.ISO_8601).toDate()
      : patient.fechaAntipulgas;

    const updatedFields = {
      nombreAnimal: nombreAnimal || patient.nombreAnimal,
      especie: especie || patient.especie,
      fechaNacimiento: parsedFechaNacimiento,
      sexo: sexo || patient.sexo,
      castrado: castrado || patient.castrado,
      vacunado: vacunado || patient.vacunado,
      desparasitado: desparasitado || patient.desparasitado,
      antipulgas: antipulgas || patient.antipulgas,
      fechaDesparasitado: parsedFechaDesparasitado,
      fechaVacunado: parsedFechaVacunado,
      fechaCastrado: parsedFechaCastrado,
      fechaAntipulgas: parsedFechaAntipulgas,
      propietario: propietarioId || patient.propietario,
    };

    const isModified = Object.keys(updatedFields).some(
      (key) =>
        JSON.stringify(patient[key]) !== JSON.stringify(updatedFields[key]),
    );

    if (!isModified) {
      return res
        .status(200)
        .json({
          message: "No se realizaron cambios, los datos son iguales",
          data: patient,
          error: false,
        });
    }

    if (
      propietarioId &&
      mongoose.isValidObjectId(propietarioId) &&
      propietarioId !== String(patient.propietario)
    ) {
      const newPropietario = await Propietarios.findById(propietarioId);
      if (!newPropietario) {
        return res
          .status(404)
          .json({ message: "Nuevo propietario no encontrado", error: true });
      }

      const oldPropietario = await Propietarios.findById(patient.propietario);
      if (oldPropietario) {
        oldPropietario.pacientes.pull(patient._id);
        await oldPropietario.save();
      }

      newPropietario.pacientes.push(patient._id);
      await newPropietario.save();
    }

    Object.assign(patient, updatedFields);

    const updatedPatient = await patient.save();
    return res
      .status(200)
      .json({
        message: "Paciente actualizado con éxito",
        data: updatedPatient,
        error: false,
      });
  } catch (err) {
    console.error("Error al actualizar el paciente:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

export async function deletePatient(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID inválido", error: true });
  }

  try {
    const patient = await Paciente.findById(id);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Paciente no encontrado", error: true });
    }

    const propietario = await Propietarios.findById(patient.propietario);
    if (propietario) {
      propietario.pacientes.pull(patient._id);
      await propietario.save();
    }

    await patient.remove();
    return res
      .status(200)
      .json({
        message: "Paciente eliminado correctamente",
        data: patient,
        error: false,
      });
  } catch (err) {
    console.error("Error al eliminar el paciente:", err.message);
    return res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}
