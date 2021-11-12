const controllerWrapper = (ctrl) => {
  const controller = async (req, res, next) => {
    try {
      await ctrl(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return controller;
};

module.exports = controllerWrapper;
