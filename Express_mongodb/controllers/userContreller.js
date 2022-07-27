const { json } = require("body-parser");
const Users = require("../models/users");
const Otp = require("../models/Otp");
const Info = require("../models/info");
const Logotp = require("../models/logotp");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "anilbabu$oy";

const userList = async (req, res) => {
  let data = await Users.find();
  res.json(data);
};

const getloginotp = async (req, res) => {
  const errors = validationResult(req);
  const { phone } = req;
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: errors.array() });
  }
 


    let otpscode = Math.floor(Math.random() * 10000 + 1);
    let otpdata = new Logotp({
      code: otpscode,
    });

    let responce = await otpdata.save();

    res.send({status:true,smg:'Opt send Successfully'});

};


const createUser = async (req, res) => {
  try {
    let profle = req.file ? req.file.path : "";
    let { name, email, phone, password } = req.body;

    //validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: errors.array() });
    }
    //check in database that user is with email is allready present or not
    let user = await Users.findOne({ email });
    if (user) {
      return res.json({
        status: false,
        smg: "Sorry a user with this email already exists",
      });
     
    }
    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user = await Users.create({
      name: name,
      email: email,
      phone: phone,
      filePath: profle,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user)
    //res.json({authtoken })

    res.send({
      status: true,
      success: "Register successfully",
      authtoken,
    });
  } catch (error) {
    res.status(502).json({ success: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: "Please try to login with correct credentials",
      });
    }

    let user = await Users.findOne({ email: email });

    if (user) {
      let match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (!match) {
        return res.json({
          error: "Please try to login with correct credentials",
        });
      }
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ status: true, msg: "Login successfully", authtoken });
  } catch (error) {
    res.status(502).json({ success: "Internal server error" });
  }
};

const emailsend = async (req, res) => {
  let { email } = req.body;
  console.log(email);
  let user = await Users.findOne({ email });
  console.log(user);
  if (user) {
    if (user) {
      let otpscode = Math.floor(Math.random() * 10000 + 1);
      let otpdata = new Otp({
        email: req.body.email,
        code: otpscode,
        expireIn: new Date().getTime() + 200 * 1000,
      });

      let responce = await otpdata.save();
      mamiler(req.body.email, otpscode);
      res.send("Please chack your mail");
    }
  } else {
    res.status(404).json({ success: "Email id is not exist" });
  }
};

const resetpassword = async (req, res) => {
  let { email, otpcode, cpassword } = req.body;

  let data = await Otp.find({ email: email, code: otpcode });

  if (data) {
    let curtime = new Date().getTime();
    let deff = data.expireIn - curtime;
    if (deff < 0) {
      res.status(404).json({ success: "opt now exprire" });
    } else {
      let user = await Users.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(cpassword, salt);
      user.password = secPass;
      user.save();
      console.log(user);
      res.send("change password Successfully");
    }
  }
};

const mamiler = async (email, otp) => {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "anil babu",
      pass: "Anilb@1234",
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var mailOptions = {
    from: "anilb9850@gmail.com",
    to: "anilbabu3245@gmail.com",
    subject: "Sending Email using Node.js",
    text: { otp },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const userinfo = async (req, res) => {
  let profle = req.file ? req.file.path : "";
  try {
    const { classs, city, fathersName, state } = req.body;
    console.log(req.user.id, classs, city, fathersName);

    const userinfo = new Info({
      user: req.user.id,
      classs: classs,
      city: city,
      filePath: profle,
      fathersName: fathersName,
      state: state,
    });
    const userinformation = await userinfo.save();

    res.send("info added successfully");
  } catch (error) {
    res.status(400).send("Internal server error");
  }
};

const getuserinf = async (req, res) => {
  const info = await Info.find({ user: req.user.id });
  console.log(info);

  res.json(info);
};
module.exports = {
  userList,
  createUser,
  userLogin,
  emailsend,
  resetpassword,
  userinfo,
  getuserinf,
  getloginotp,
};
