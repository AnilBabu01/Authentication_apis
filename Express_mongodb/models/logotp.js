const mongoose = require("mongoose");
const { Schema } = mongoose;
const Logotp = new Schema({
  code: {
    type: String,
    index: { expires: '1m' },
  },
 
});

const Loginotp = mongoose.model("Logotp", Logotp);

module.exports = Loginotp;
