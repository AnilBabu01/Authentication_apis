const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userContreller");
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const getuser = require("../middleware/getuser");
const JWT_SECRET = "anilbabu$oy";

var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./public/img");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + " " + file.originalname);
  },
});

const upload = multer({ storage });

const jwtauth = (req, res, next) => {
  var token = req.headers.authorization;
  token = token.split(" ")[1];

  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      res.send("invalid token");
    } else {
      next();
    }
  });
};
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/users", userCtrl.userList);

router.post(
  "/getotp",
  [body("number", "Please Enter more than 10 digits").isLength({ min: 10 })],
  userCtrl.getloginotp
);

router.post(
  "/register",
  [
    body("otp", "Enter a valid otp").isLength({ min: 4 }),
    body("name", "Enter your name").isLength({ min: 4 }),
    body("email", "Enter a valid email").isEmail(),
    body("number", "phone must be atleast 10 digits").isLength({ min: 10 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  
  ],
  userCtrl.register
);

router.post(
  "/register",
  upload.single("myFile"),
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("phone", "phone must be atleast 10 digits").isLength({ min: 10 }),
  ],
  userCtrl.createUser
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  userCtrl.userLogin
);

router.post("/emailsend", userCtrl.emailsend);

router.post("/changepassword", userCtrl.resetpassword);

router.post("/info", upload.single("myFile"), getuser, userCtrl.userinfo);

router.get("/getuserinfo", getuser, userCtrl.getuserinf);
module.exports = router;
