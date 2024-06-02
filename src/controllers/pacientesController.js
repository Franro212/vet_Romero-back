import Paciente from "../models/pacientes";

export async function getAllPatients(req, res) {
  try {
    const patients = await Paciente.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function addPatient(req, res) {
  const patient = new Paciente({
    propietario: req.body.propietario,
    telefono: req.body.telefono,
    socio: req.body.socio,
    numeroSocio: req.body.numeroSocio,
    nombreAnimal: req.body.nombreAnimal,
    especie: req.body.especie,
    fechaNacimiento: req.body.fechaNacimiento,
    sexo: req.body.sexo,
    castrado: req.body.castrado,
    vacunado: req.body.vacunado,
    desparasitado: req.body.desparasitado,
    antipulgas: req.body.antipulgas,
    fechaDesparasitado: req.body.fechaDesparasitado,
    fechaVacunado: req.body.fechaVacunado,
    fechaCastrado: req.body.fechaCastrado,
    fechaAntipulgas: req.body.fechaAntipulgas,
    historial: req.body.historial || [],
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getPatientById(req, res) {
  try {
    const patient = await Paciente.findById(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updatePatient(req, res) {
  try {
    const patient = await Paciente.findById(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });

    if (req.body.propietario !== undefined)
      patient.propietario = req.body.propietario;
    if (req.body.telefono !== undefined) patient.telefono = req.body.telefono;
    if (req.body.socio !== undefined) patient.socio = req.body.socio;
    if (req.body.numeroSocio !== undefined)
      patient.numeroSocio = req.body.numeroSocio;
    if (req.body.nombreAnimal !== undefined)
      patient.nombreAnimal = req.body.nombreAnimal;
    if (req.body.especie !== undefined) patient.especie = req.body.especie;
    if (req.body.fechaNacimiento !== undefined)
      patient.fechaNacimiento = req.body.fechaNacimiento;
    if (req.body.sexo !== undefined) patient.sexo = req.body.sexo;
    if (req.body.castrado !== undefined) patient.castrado = req.body.castrado;
    if (req.body.vacunado !== undefined) patient.vacunado = req.body.vacunado;
    if (req.body.desparasitado !== undefined)
      patient.desparasitado = req.body.desparasitado;
    if (req.body.antipulgas !== undefined)
      patient.antipulgas = req.body.antipulgas;
    if (req.body.fechaDesparasitado !== undefined)
      patient.fechaDesparasitado = req.body.fechaDesparasitado;
    if (req.body.fechaVacunado !== undefined)
      patient.fechaVacunado = req.body.fechaVacunado;
    if (req.body.fechaCastrado !== undefined)
      patient.fechaCastrado = req.body.fechaCastrado;
    if (req.body.fechaAntipulgas !== undefined)
      patient.fechaAntipulgas = req.body.fechaAntipulgas;
    if (req.body.historial !== undefined)
      patient.historial = req.body.historial;

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deletePatient(req, res) {
  try {
    const patient = await Paciente.findById(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });

    await patient.remove();
    res.json({ message: "Paciente eliminado éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
