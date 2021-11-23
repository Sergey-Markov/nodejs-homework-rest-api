const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_kEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Please login",
      });
    }

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Please get authorization, you are unauthorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_kEY);
      const user = await User.findById(id, "_id email token"); // вторым аргументом можна указывать перечень полей которые мы хотим получить
      if (!user) {
        res.status(404).json({
          status: "NotFound",
          code: 404,
          message: "User not found",
        });
      }
      if (!user.token) {
        throw new Unauthorized("User unauthorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
