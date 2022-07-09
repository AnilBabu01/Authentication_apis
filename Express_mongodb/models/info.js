const mongoose = require("mongoose");
const { Schema } = mongoose;
const InfoSchema = new Schema({
  
    user:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
     
    },
    classs:{
    type: String,
    require: true,
    },
    city:{
        type:String,
        require
    },
    filePath:{
        type:String,
       },
    fathersName:{
        type:String
    },
    state:{
        type:String,
    }

});

const Info = mongoose.model("userdetails", InfoSchema);

module.exports = Info;
