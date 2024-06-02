import  {model, Schema } from 'mongoose';

const PacienteSchema = Schema({
  propietario: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  socio: {
    type: Boolean,
  },
  numeroSocio: {
    type: Number,
  },
  nombreAnimal: {
    type: String,
    required: true,
  },
  especie: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  castrado: {
    type: Boolean,
  },
  vacunado: {
    type: Boolean,
  },
  desparasitado: {
    type: Boolean,
  },
  antipulgas: {
    type: Boolean,
  },
  fechaDesparasitado: {
    type: Date,
  },
  fechaVacunado: {
    type: Date,
  },
  fechaCastrado: {
    type: Date,
  },
  fechaAntipulgas: {
    type: Date,
  },
  historial: [{
    type: Schema.Types.ObjectId,
    ref: 'Fichas'
  }]
});

export default model("Paciente", PacienteSchema);
