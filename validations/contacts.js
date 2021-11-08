const Joi = require("joi");

const joiSchemaOnPOST = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().positive().required(),
});
const joiSchemaOnPUT = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().positive(),
});

module.exports = {
  joiSchemaOnPOST,
  joiSchemaOnPUT,
};
