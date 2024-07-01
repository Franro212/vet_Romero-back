import { Schema, model } from 'mongoose';

const PacienteSchema = new Schema({
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
  }],
  propietario: {
    type: Schema.Types.ObjectId,
    ref: 'Propietarios',
    required: true,
  },
});

PacienteSchema.pre('remove', async function(next) {
  try {
    await Ficha.deleteMany({ _id: { $in: this.historial } });
    next();
  } catch (err) {
    next(err);
  }
});

export default model("Pacientes", PacienteSchema);
