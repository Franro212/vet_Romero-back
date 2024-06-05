import Paciente from "../models/pacientes";
import mongoose from "mongoose";
import moment from "moment";

export async function getAllPatients(req, res) {
  try {
    const patients = await Paciente.find();

    res
      .status(200)
      .json({ message: "Lista de pacientes", data: patients, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function addPatient(req, res) {
  const {
    propietario,
    telefono,
    socio,
    numeroSocio,
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
    historial = [],
  } = req.body;

  const patient = new Paciente({
    propietario,
    telefono,
    socio,
    numeroSocio,
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
    historial,
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json({
      message: "Paciente creado con éxito",
      error: false,
      data: newPatient,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true });
  }
}

export async function getPatientById(req, res) {
  try {
    const patient = await Paciente.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado",
        data: undefined,
        error: true,
      });
    }
    res
      .status(200)
      .json({ message: "Paciente encotrado", error: false, data: patient });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, data: undefined, error: true });
  }
}

export async function updatePatient(req, res) {
  const { id } = req.params;
  const {
    propietario,
    telefono,
    socio,
    numeroSocio,
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
  } = req.body;

  try {
    const patient = await Paciente.findById(id);

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado",
        error: true,
      });
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
      propietario: propietario || patient.propietario,
      telefono: telefono || patient.telefono,
      socio: socio || patient.socio,
      numeroSocio: numeroSocio || patient.numeroSocio,
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
    };

    const isModified = Object.keys(updatedFields).some(
      (key) =>
        JSON.stringify(patient[key]) !== JSON.stringify(updatedFields[key]),
    );
    

    if (!isModified) {
      return res.status(200).json({
        message: "No se realizaron cambios, los datos son iguales",
        data: patient,
        error: false,
      });
    }

    Object.assign(patient, updatedFields);

    const updatedPatient = await patient.save();
    return res.status(200).json({
      message: "Paciente actualizado con éxito",
      data: updatedPatient,
      error: false,
    });
  } catch (err) {
    console.error("Error en el proceso de actualización:", err.message);
    return res.status(500).json({
      message: "Hubo un error interno en el servidor",
      error: true,
    });
  }
}

export async function deletePatient(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "ID Inválido",
      error: true,
    });
  }

  try {
    const deletedPatient = await Paciente.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({
        message: "Paciente no encontrado",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Paciente eliminado correctamente",
      error: false,
      data: deletedPatient,
    });
  } catch (error) {
    console.error("Error al eliminar el Paciente:", error);
    return res.status(500).json({
      message: "Ocurrió un error al eliminar el paciente",
      error: true,
      error: error.message,
    });
  }
}
