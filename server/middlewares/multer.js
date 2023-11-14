const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const middlewareUpload = upload.single("img");
module.exports = middlewareUpload;
