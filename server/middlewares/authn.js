const { decode } = require("../helpers/jwt");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("please login first");
    }
    let authen = authorization.split(" ")[1];

    let data = decode(authen);
    req.userInfo = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
