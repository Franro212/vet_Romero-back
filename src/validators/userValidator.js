import Joi from "joi";

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":
      "El campo de correo electrónico debe ser una dirección de correo válida",
    "any.required": "El campo de correo electrónico es obligatorio",
  }),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
    )
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
      "any.required": "El campo de contraseña es obligatorio",
    }),
});

export const validateUserLogin = (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
    if (!error) {
      return next();
    }

    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({
      message: "Hubo errores de validación en los datos del usuario",
      data: null,
      errors: validationErrors,
    });
  } catch (err) {
    console.error("Error en la validación del usuario:", err);
    return res.status(500).json({
      message: "Hubo un error interno en el servidor",
      data: null,
      error: true,
    });
  }
};
const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":
      "El campo de correo electrónico debe ser una dirección de correo válida",
    "any.required": "El campo de correo electrónico es obligatorio",
  }),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
    )
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
      "any.required": "El campo de contraseña es obligatorio",
    }),
});

export const validateUser = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (!error) {
      return next();
    }

    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({
      message: "Hubo errores de validación en los datos del usuario",
      data: null,
      errors: validationErrors,
    });
  } catch (err) {
    console.error("Error en la validación del usuario:", err);
    return res.status(500).json({
      message: "Hubo un error interno en el servidor",
      data: null,
      error: true,
    });
  }
};
