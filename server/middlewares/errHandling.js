const errHandling = (err, req, res, next) => {
  let code = 500;
  let msg = "INTERNAL_SERVER_ERROR";
  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Email Already Exist";
  }
  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors[0].message;
  }
  if (err.message === "please input password") {
    code = 400;
    msg = "please input password";
  }
  if (err.message === "please input email") {
    code = 400;
    msg = "please input email";
  }
  if (err.message === "INVALID EMAIL/PASSWORD") {
    code = 400;
    msg = "INVALID EMAIL/PASSWORD";
  }
  console.log(err);
  res.status(code).json({
    code,
    msg,
  });
};

module.exports = errHandling;
