import mongoose from "mongoose";
import Ficha from "../models/fichas";
import Paciente from "../models/pacientes";
import moment from "moment";

export async function getAllFichas(req, res) {
  try {
    const paciente = await Paciente.findById(req.params.pacienteId).populate(
      "historial",
    );

    if (!paciente) {
      return res.status(404).json({
        message: "Paciente no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Lista de fichas",
      data: paciente.historial,
      error: false,
    });
  } catch (err) {
    console.error("Error en la obtención de las fichas:", err.message);
    res
      .status(500)
      .json({ message: "Hubo un error interno en el servidor", error: true });
  }
}

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
    paciente: req.params.pacienteId,
  });

  try {
    const newFicha = await ficha.save();

    const paciente = await Paciente.findById(req.params.pacienteId);
    if (!paciente)
      return res.status(404).json({
        message: "Paciente no encontrado",
        data: undefined,
        error: true,
      });

    paciente.historial.push(newFicha._id);
    await paciente.save();

    res.status(201).json({ message: "Ficha creada con exito", data: newFicha });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getFichaById(req, res) {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) {
      return res
        .status(404)
        .json({ message: "Ficha no encontrada", data: undefined, error: true });
    }
    res
      .status(200)
      .json({ data: ficha, message: "Ficha encotrada", error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateFicha(req, res) {
  const { id } = req.params;
  const {
    fechaConsulta,
    algunMedicamento,
    cualesMedicamentos,
    motivoConsulta,
    sistemaComprometido,
    examenesColaterales,
    tipoExamenes,
    evolucion,
    proximaConsulta,
  } = req.body;

  try {
    const ficha = await Ficha.findById(id);

    if (!ficha) {
      return res.status(404).json({
        message: "Ficha no encontrada",
        error: true,
      });
    }

    const parsedFechaConsulta = fechaConsulta
      ? moment(fechaConsulta, "DD/MM/YYYY").toDate()
      : ficha.fechaConsulta;
    const parsedFechaProximaConsulta = proximaConsulta
      ? moment(proximaConsulta, "DD/MM/YYYY").toDate()
      : ficha.proximaConsulta;

    const updatedFields = {
      algunMedicamento:
        algunMedicamento !== undefined
          ? algunMedicamento
          : ficha.algunMedicamento,
      cualesMedicamentos: cualesMedicamentos || ficha.cualesMedicamentos,
      motivoConsulta: motivoConsulta || ficha.motivoConsulta,
      sistemaComprometido: sistemaComprometido || ficha.sistemaComprometido,
      examenesColaterales:
        examenesColaterales !== undefined
          ? examenesColaterales
          : ficha.examenesColaterales,
      tipoExamenes: tipoExamenes || ficha.tipoExamenes,
      evolucion: evolucion || ficha.evolucion,
      fechaConsulta: parsedFechaConsulta,
      proximaConsulta: parsedFechaProximaConsulta,
    };
    console.log(
      parsedFechaConsulta,
      parsedFechaProximaConsulta,
      algunMedicamento,
      cualesMedicamentos,
      motivoConsulta,
      sistemaComprometido,
      examenesColaterales,
      tipoExamenes,
      evolucion,
    );

    const isModified = Object.keys(updatedFields).some((key) => {
      const originalValue = ficha[key];
      const newValue = updatedFields[key];

      if (originalValue instanceof Date && newValue instanceof Date) {
        return originalValue.getTime() !== newValue.getTime();
      }
      return originalValue !== newValue;
    });

    if (!isModified) {
      return res.status(200).json({
        message: "No se realizaron cambios, los datos son iguales",
        data: ficha,
        error: false,
      });
    }

    Object.assign(ficha, updatedFields);

    const updatedFicha = await ficha.save();
    return res.status(200).json({
      message: "Ficha actualizada con éxito",
      data: updatedFicha,
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

export async function deleteFicha(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "ID Inválido",
      error: true,
    });
  }

  try {
    const deleteFicha = await Ficha.findByIdAndDelete(id);

    if (!deleteFicha) {
      return res.status(404).json({
        message: "Ficha no encontrado",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Ficha eliminada correctamente",
      error: false,
      data: deleteFicha,
    });
  } catch (error) {
    console.error("Error al eliminar la ficha:", error);
    return res.status(500).json({
      message: "Ocurrió un error al eliminar la ficha",
      error: true,
      error: error.message,
    });
  }
}
