const mongoose = require("mongoose");
const { Schema } = mongoose;
const OtpSchema = new Schema({
  
  email: {
    type: String,
    require: true,
 
  },
  code: {
    type: String,
  },
  expireIn: {
    type: String,
  },
});

const Otp = mongoose.model("otp", OtpSchema,'otp');

module.exports = Otp;
