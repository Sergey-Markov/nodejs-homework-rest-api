const createError = require("http-errors");

const validation = (joiSchema) => {
  const validationMiddleware = (req, _, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const newError = new createError(400, "missing fields");
      next(newError);
    }
    next();
  };
  return validationMiddleware;
};

module.exports = validation;
