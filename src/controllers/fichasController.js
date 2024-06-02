import Ficha from "../models/fichas";
import Paciente from "../models/pacientes";

// Get all fichas for a specific patient
export async function getAllFichas(req, res) {
  try {
    const fichas = await Ficha.find({ paciente: req.params.pacienteId });
    res.json(fichas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new ficha for a patient
export async function addFicha(req, res) {
  const ficha = new Ficha({
    fechaConsulta: req.body.fechaConsulta,
    algunMedicamento: req.body.algunMedicamento,
    cualesMedicamentos: req.body.cualesMedicamentos,
    motivoConsulta: req.body.motivoConsulta,
    sistemaComprometido: req.body.sistemaComprometido,
    examenesColaterales: req.body.examenesColaterales,
    tipoExamenes: req.body.tipoExamenes,
    evolucion: req.body.evolucion,
    proximaConsulta: req.body.proximaConsulta,
    paciente: req.params.pacienteId, // Asociar ficha al paciente
  });

  try {
    const newFicha = await ficha.save();

    // Agregar la ficha al historial del paciente
    const paciente = await Paciente.findById(req.params.pacienteId);
    if (!paciente)
      return res.status(404).json({ message: "Paciente no encontrado" });

    paciente.historial.push(newFicha._id);
    await paciente.save();

    res.status(201).json(newFicha);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get a ficha by ID
export async function getFichaById(req, res) {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });
    res.json(ficha);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a ficha
export async function updateFicha(req, res) {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });

    if (req.body.fechaConsulta) ficha.fechaConsulta = req.body.fechaConsulta;
    if (req.body.algunMedicamento !== undefined)
      ficha.algunMedicamento = req.body.algunMedicamento;
    if (req.body.cualesMedicamentos)
      ficha.cualesMedicamentos = req.body.cualesMedicamentos;
    if (req.body.motivoConsulta) ficha.motivoConsulta = req.body.motivoConsulta;
    if (req.body.sistemaComprometido)
      ficha.sistemaComprometido = req.body.sistemaComprometido;
    if (req.body.examenesColaterales !== undefined)
      ficha.examenesColaterales = req.body.examenesColaterales;
    if (req.body.tipoExamenes) ficha.tipoExamenes = req.body.tipoExamenes;
    if (req.body.evolucion) ficha.evolucion = req.body.evolucion;
    if (req.body.proximaConsulta)
      ficha.proximaConsulta = req.body.proximaConsulta;

    const updatedFicha = await ficha.save();
    res.json(updatedFicha);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a ficha
export async function deleteFicha(req, res) {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });

    await ficha.remove();
    res.json({ message: "Ficha eliminada con éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
