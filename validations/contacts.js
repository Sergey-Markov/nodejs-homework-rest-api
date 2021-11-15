const Joi = require("joi");

const joiSchemaOnPOST = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().positive().required(),
  favorite: Joi.bool().default(false),
});
const joiSchemaOnPUT = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().positive(),
  favorite: Joi.bool().default(false),
});
const joiSchemaOnAuth = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
});

module.exports = {
  joiSchemaOnPOST,
  joiSchemaOnPUT,
  joiSchemaOnAuth,
};
