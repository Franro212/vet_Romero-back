import { Schema, model } from 'mongoose';
import Paciente from './pacientes';

const PropietariosSchema = new Schema({
  propietario: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  telefonoSecundario: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  socio: {
    type: Boolean,
  },
  numeroSocio: {
    type: Number,
  },
  pacientes: [{
    type: Schema.Types.ObjectId,
    ref: 'Pacientes'
  }]
});

PropietariosSchema.pre('remove', async function(next) {
  try {
    await Paciente.deleteMany({ _id: { $in: this.pacientes } });
    next();
  } catch (err) {
    next(err);
  }
});

export default model("Propietarios", PropietariosSchema);
