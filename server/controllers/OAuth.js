const { OAuth2Client } = require("google-auth-library");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
class GoogleLogin {
  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        default: {
          name: payload.given_name,
          email: payload.email,
          phoneNumber: "+62",
          password: "password",
          pfp: payload.picture,
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      res.status(201).json(access_token);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GoogleLogin;
