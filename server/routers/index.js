const express = require("express");
const middlewareUpload = require("../middlewares/multer");
const UserClass = require("../controllers/user");
const auth = require("../middlewares/authn");
const destination = require("./destination");
const router = express.Router();

router.post("/register", middlewareUpload, UserClass.regist);
router.post("/login", UserClass.login);
router.use(auth);
router.use(destination);
module.exports = router;
