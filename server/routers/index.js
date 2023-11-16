const express = require("express");
const middlewareUpload = require("../middlewares/multer");
const UserClass = require("../controllers/user");
const auth = require("../middlewares/authn");
const destination = require("./destination");
const router = express.Router();
const oauth = require("../controllers/OAuth");
router.post("/register", middlewareUpload, UserClass.regist);
// router.patch("/register", middlewareUpload, UserClass.registPfp);
router.post("/login", UserClass.login);
router.post("/logingoogle", oauth.loginGoogle);
router.use(auth);
router.get("/user", UserClass.getUser);
router.use(destination);
module.exports = router;
