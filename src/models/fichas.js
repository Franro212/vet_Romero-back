import { Schema, model } from "mongoose";

const FichasSchema = new Schema({
  fechaConsulta: {
    type: Date,
    required: true,
  },
  algunMedicamento: {
    type: Boolean,
    required: true,
  },
  cualesMedicamentos: {
    type: String,
  },
  motivoConsulta: {
    type: String,
    required: true,
  },
  sistemaComprometido: {
    type: String,
    required: true,
  },
  examenesColaterales: {
    type: Boolean,
  },
  tipoExamenes: {
    type: String,
  },
  evolucion: {
    type: String,
  },
  proximaConsulta: {
    type: Date,
  },
});

export default model("Fichas", FichasSchema);
